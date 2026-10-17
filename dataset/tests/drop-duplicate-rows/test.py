import os, sys, json, time, random
import pandas as pd
import numpy as np

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/drop-duplicate-rows.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

def assert_frame_equal(df_act, df_exp):
    assert list(df_act.columns) == list(df_exp.columns), f'Cols: {df_act.columns} vs {df_exp.columns}'
    assert list(df_act.index) == list(df_exp.index), f'Index: {df_act.index} vs {df_exp.index}'
    assert len(df_act) == len(df_exp), f'Len: {len(df_act)} vs {len(df_exp)}'
    for c in df_act.columns:
        for v1, v2 in zip(df_act[c], df_exp[c]):
            if pd.isna(v1) and pd.isna(v2): continue
            assert v1 == v2, f'Val in {c}: {v1} != {v2}'

def ref_drop_duplicates(df):
    seen = set()
    keep_indices = []
    for idx, email in enumerate(df['email']):
        if email not in seen:
            seen.add(email)
            keep_indices.append(idx)
    return df.iloc[keep_indices]

# Fixed Cases
f1 = pd.DataFrame(columns=['customer_id', 'name', 'email'])
f2 = pd.DataFrame({
    'customer_id': [1, 2, 3],
    'name': ['Ella', 'David', 'Zachary'],
    'email': ['emily@example.com', 'michael@example.com', 'sarah@example.com']
})
f3 = pd.DataFrame({
    'customer_id': [1, 2, 3, 4, 5, 6],
    'name': ['Ella', 'David', 'Zachary', 'Alice', 'Finn', 'Violet'],
    'email': ['emily@example.com', 'michael@example.com', 'sarah@example.com', 'emily@example.com', 'john@example.com', 'john@example.com']
})
f4 = pd.DataFrame({
    'customer_id': [1, 2, 3],
    'name': ['A', None, 'C'],
    'email': ['dup@example.com', 'dup@example.com', 'dup@example.com']
})

for df in [f1, f2, f3, f4]:
    act = dropDuplicateEmails(df.copy())
    exp = ref_drop_duplicates(df)
    assert_frame_equal(act, exp)

# Random Cases
random.seed(42)
emails_pool = [f'user_{i}@domain.com' for i in range(15)]
for _ in range(25):
    n = random.randint(0, 80)
    rows = []
    for cid in range(1, n + 1):
        name = f'Name_{cid}' if random.random() > 0.1 else None
        email = random.choice(emails_pool)
        rows.append({'customer_id': cid, 'name': name, 'email': email})
    df_rand = pd.DataFrame(rows, columns=['customer_id', 'name', 'email'])
    act = dropDuplicateEmails(df_rand.copy())
    exp = ref_drop_duplicates(df_rand)
    assert_frame_equal(act, exp)

# Max Size
t0 = time.perf_counter()
max_rows = [{'customer_id': i, 'name': f'Cust_{i}', 'email': f'cust_{i % 500}@test.com'} for i in range(10000)]
df_max = pd.DataFrame(max_rows)
act_max = dropDuplicateEmails(df_max)
t1 = time.perf_counter()
assert len(act_max) == 500
print(f'Passed 4 fixed, 25 random, and 1 max-size (10,000 rows in {t1 - t0:.4f}s) tests')
