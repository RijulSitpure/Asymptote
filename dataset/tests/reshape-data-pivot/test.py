import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/reshape-data-pivot.json')) as f:
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

def ref_pivot(df):
    months = sorted(list(set(df['month'])))
    cities = sorted(list(set(df['city'])))
    
    grid = {city: [None] * len(months) for city in cities}
    month_to_idx = {m: i for i, m in enumerate(months)}
    for _, row in df.iterrows():
        c = row['city']
        m = row['month']
        t = row['temperature']
        grid[c][month_to_idx[m]] = t
    
    res = pd.DataFrame(grid, index=pd.Index(months, name='month'))
    res.columns.name = 'city'
    return res

# Fixed Cases
f1 = pd.DataFrame({
    'city': ['Jacksonville', 'Jacksonville', 'Jacksonville', 'Jacksonville', 'Jacksonville', 'ElPaso', 'ElPaso', 'ElPaso', 'ElPaso', 'ElPaso'],
    'month': ['January', 'February', 'March', 'April', 'May', 'January', 'February', 'March', 'April', 'May'],
    'temperature': [13, 23, 38, 5, 34, 20, 6, 26, 2, 43]
})
act1 = pivotTable(f1.copy())
exp1 = ref_pivot(f1)
assert_frame_equal(act1, exp1)

# Random Cases
random.seed(42)
cities_pool = ['London', 'Tokyo', 'Paris', 'NewYork', 'Sydney']
months_pool = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
for _ in range(25):
    sub_cities = random.sample(cities_pool, random.randint(1, len(cities_pool)))
    sub_months = random.sample(months_pool, random.randint(1, len(months_pool)))
    rows = []
    for c in sub_cities:
        for m in sub_months:
            rows.append({'city': c, 'month': m, 'temperature': random.randint(-20, 45)})
    random.shuffle(rows)
    df_rand = pd.DataFrame(rows)
    act = pivotTable(df_rand.copy())
    exp = ref_pivot(df_rand)
    # When pivotTable runs, index and column ordering may match unique occurrences
    # Normalize by sorting index and columns for robust comparison
    act_sorted = act.sort_index().reindex(sorted(act.columns), axis=1)
    exp_sorted = exp.sort_index().reindex(sorted(exp.columns), axis=1)
    assert_frame_equal(act_sorted, exp_sorted)

# Max Size
t0 = time.perf_counter()
cities_100 = [f'City_{i}' for i in range(100)]
months_100 = [f'Month_{j}' for j in range(100)]
max_rows = [{'city': cities_100[i // 100], 'month': months_100[i % 100], 'temperature': i % 50} for i in range(10000)]
df_max = pd.DataFrame(max_rows)
act_max = pivotTable(df_max)
t1 = time.perf_counter()
assert act_max.shape == (100, 100)
print(f'Passed 1 fixed, 25 random, and 1 max-size (10,000 rows in {t1 - t0:.4f}s) tests')
