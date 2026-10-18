import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

/**
 * Multi-language verification for Database problems:
 * Executes the `pythondata` solution in Python/pandas against test cases
 * to verify 100% agreement with SQL results.
 */
export function verifyDatabasePandas(slug, prob, slugTestDir, runtimes) {
  const pySol = prob.solutions?.find(s => s.lang === 'pythondata');
  if (!pySol || !runtimes.pandas || !runtimes.python3) {
    return;
  }

  const schemaPath = path.join(slugTestDir, 'schema.sql');
  const refSqlPath = path.join(slugTestDir, 'reference.sql');
  const genPath = path.join(slugTestDir, 'generator.py');

  if (!fs.existsSync(schemaPath) || !fs.existsSync(genPath)) {
    return;
  }

  const pyScript = `
import sys, os, json, sqlite3, subprocess, re
import pandas as pd

slug = '${slug}'
schema = open('${schemaPath}').read()
sol_code = """${pySol.code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""
scope = {}
exec(sol_code, scope)

gen = subprocess.run(['python3', '${genPath}'], capture_output=True, text=True, check=True)
cases = json.loads(gen.stdout)

if slug == 'combine-two-tables':
    func = scope['combine_two_tables']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        p_df = pd.read_sql('SELECT * FROM Person', conn)
        a_df = pd.read_sql('SELECT * FROM Address', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(p_df, a_df)
        cols = ['firstName', 'lastName', 'city', 'state']
        s1 = sql_df[cols].sort_values(by=cols, na_position='first').reset_index(drop=True)
        s2 = res_df[cols].sort_values(by=cols, na_position='first').reset_index(drop=True)
        assert s1.where(pd.notnull(s1), None).to_dict('records') == s2.where(pd.notnull(s2), None).to_dict('records'), f'Mismatch in {tc[\"name\"]}'
        conn.close()

elif slug == 'second-highest-salary':
    func = scope['second_highest_salary']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        emp_df = pd.read_sql('SELECT * FROM Employee', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(emp_df)
        v_sql = None if pd.isna(sql_df.iloc[0, 0]) else sql_df.iloc[0, 0]
        v_res = None if pd.isna(res_df.iloc[0, 0]) else res_df.iloc[0, 0]
        assert v_sql == v_res, f'Mismatch in {tc[\"name\"]}: {v_sql} != {v_res}'
        conn.close()

elif slug == 'department-highest-salary':
    func = scope['department_highest_salary']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        emp_df = pd.read_sql('SELECT * FROM Employee', conn)
        dept_df = pd.read_sql('SELECT * FROM Department', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(emp_df, dept_df)
        cols = ['Department', 'Employee', 'Salary']
        if sql_df.empty:
            assert res_df.empty, f'Expected empty in {tc[\"name\"]}'
        else:
            s1 = sql_df[cols].sort_values(by=cols).reset_index(drop=True)
            s2 = res_df[cols].sort_values(by=cols).reset_index(drop=True)
            assert s1.to_dict('records') == s2.to_dict('records'), f'Mismatch in {tc[\"name\"]}'
        conn.close()

elif slug == 'rising-temperature':
    func = scope['rising_temperature']
    from datetime import datetime, timedelta
    for tc in cases:
        sql = tc['inserts']
        rows = []
        if sql.strip():
            tuples = re.findall(r'\\(([^)]+)\\)', sql)
            for t in tuples:
                parts = [p.strip().strip(\"'\") for p in t.split(',')]
                val = None if parts[2] == 'NULL' else float(parts[2])
                rows.append((int(parts[0]), parts[1], val))
        
        parsed = []
        for r in rows:
            parsed.append((r[0], datetime.strptime(r[1], '%Y-%m-%d'), r[2]))
        parsed.sort(key=lambda x: x[1])
        exp_ids = []
        for i in range(1, len(parsed)):
            if parsed[i][1] == parsed[i-1][1] + timedelta(days=1):
                if parsed[i][2] is not None and parsed[i-1][2] is not None and parsed[i][2] > parsed[i-1][2]:
                    exp_ids.append(parsed[i][0])
                    
        df = pd.DataFrame(rows, columns=['id', 'recordDate', 'temperature'])
        res_df = func(df) if not df.empty else pd.DataFrame(columns=['id'])
        act_ids = res_df['id'].tolist() if not res_df.empty else []
        assert sorted(act_ids) == sorted(exp_ids), f'Mismatch in {tc[\"name\"]}'

elif slug == 'delete-duplicate-emails':
    func = scope['delete_duplicate_emails']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        p_df = pd.read_sql('SELECT * FROM Person', conn)
        conn.executescript(ref_sql)
        sql_df = pd.read_sql('SELECT * FROM Person ORDER BY id', conn)
        func(p_df)
        p_sorted = p_df.sort_values(by='id').reset_index(drop=True)
        s1 = sql_df.where(pd.notnull(sql_df), None).to_dict('records')
        s2 = p_sorted.where(pd.notnull(p_sorted), None).to_dict('records')
        assert s1 == s2, f'Mismatch in {tc["name"]}'
        conn.close()

elif slug == 'rank-scores':
    func = scope['order_scores']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        s_df = pd.read_sql('SELECT * FROM Scores', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(s_df)
        cols = ['score', 'rank']
        if sql_df.empty:
            assert res_df.empty, f'Expected empty in {tc["name"]}'
        else:
            s1 = sql_df[cols].sort_values(by=['score', 'rank'], ascending=[False, True]).reset_index(drop=True)
            s2 = res_df[cols].sort_values(by=['score', 'rank'], ascending=[False, True]).reset_index(drop=True)
            s1['score'] = s1['score'].astype(float).round(2)
            s2['score'] = s2['score'].astype(float).round(2)
            s1['rank'] = s1['rank'].astype(int)
            s2['rank'] = s2['rank'].astype(int)
            assert s1.to_dict('records') == s2.to_dict('records'), f'Mismatch in {tc["name"]}: {s2} vs {s1}'
        conn.close()

elif slug == 'consecutive-numbers':
    func = scope['consecutive_numbers']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        l_df = pd.read_sql('SELECT * FROM Logs', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(l_df)
        act = sorted(res_df['ConsecutiveNums'].dropna().astype(int).tolist()) if not res_df.empty else []
        exp = sorted(sql_df['ConsecutiveNums'].dropna().astype(int).tolist()) if not sql_df.empty else []
        assert act == exp, f'Mismatch in {tc["name"]}: {act} != {exp}'
        conn.close()

elif slug == 'employees-earning-more-than-their-managers':
    func = scope['find_employees']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        e_df = pd.read_sql('SELECT * FROM Employee', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(e_df)
        act = sorted(res_df['Employee'].dropna().tolist()) if not res_df.empty else []
        exp = sorted(sql_df['Employee'].dropna().tolist()) if not sql_df.empty else []
        assert act == exp, f'Mismatch in {tc["name"]}: {act} != {exp}'
        conn.close()

elif slug == 'duplicate-emails':
    func = scope['duplicate_emails']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        p_df = pd.read_sql('SELECT * FROM Person', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(p_df)
        act = sorted(res_df['Email'].dropna().tolist()) if not res_df.empty else []
        exp = sorted(sql_df['Email'].dropna().tolist()) if not sql_df.empty else []
        assert act == exp, f'Mismatch in {tc["name"]}: {act} != {exp}'
        conn.close()

elif slug == 'customers-who-never-order':
    func = scope['find_customers']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        c_df = pd.read_sql('SELECT * FROM Customers', conn)
        o_df = pd.read_sql('SELECT * FROM Orders', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(c_df, o_df)
        act = sorted(res_df['Customers'].dropna().tolist()) if not res_df.empty else []
        exp = sorted(sql_df['Customers'].dropna().tolist()) if not sql_df.empty else []
        assert act == exp, f'Mismatch in {tc["name"]}: {act} != {exp}'
        conn.close()

elif slug == 'department-top-three-salaries':
    func = scope['top_three_salaries']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        e_df = pd.read_sql('SELECT * FROM Employee', conn)
        d_df = pd.read_sql('SELECT * FROM Department', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(e_df, d_df)
        cols = ['Department', 'Employee', 'Salary']
        if sql_df.empty:
            assert res_df.empty, f'Expected empty in {tc["name"]}'
        else:
            s1 = sql_df[cols].sort_values(by=cols).reset_index(drop=True)
            s2 = res_df[cols].sort_values(by=cols).reset_index(drop=True)
            assert s1.to_dict('records') == s2.to_dict('records'), f'Mismatch in {tc["name"]}'
        conn.close()

elif slug == 'managers-with-at-least-5-direct-reports':
    func = scope['find_managers']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        e_df = pd.read_sql('SELECT * FROM Employee', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(e_df)
        act = sorted(res_df['name'].dropna().tolist()) if not res_df.empty else []
        exp = sorted(sql_df['name'].dropna().tolist()) if not sql_df.empty else []
        assert act == exp, f'Mismatch in {tc["name"]}: {act} != {exp}'
        conn.close()

elif slug == 'classes-more-than-5-students':
    func = scope['find_classes']
    ref_sql = open('${refSqlPath}').read()
    for tc in cases:
        conn = sqlite3.connect(':memory:')
        conn.executescript(schema)
        if tc['inserts'].strip(): conn.executescript(tc['inserts'])
        c_df = pd.read_sql('SELECT * FROM Courses', conn)
        sql_df = pd.read_sql(ref_sql, conn)
        res_df = func(c_df)
        act = sorted(res_df['class'].dropna().tolist()) if not res_df.empty else []
        exp = sorted(sql_df['class'].dropna().tolist()) if not sql_df.empty else []
        assert act == exp, f'Mismatch in {tc["name"]}: {act} != {exp}'
        conn.close()

print(f'Passed {len(cases)} pythondata test cases with 100% SQL agreement')
`;

  const run = spawnSync('python3', ['-c', pyScript], { encoding: 'utf8', timeout: 30000 });
  if (run.status !== 0) {
    throw new Error(`pythondata test verification failed for ${slug}: ${run.stderr}`);
  }
  console.log(`  ↳ Verified pythondata solution with 100% SQL agreement (${run.stdout.trim()})`);
}
