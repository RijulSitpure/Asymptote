import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/reshape-data-pivot.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

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
# LeetCode does not specify row/column order for pivot result; sort index and columns before strict assertion
act1_sorted = act1.sort_index().reindex(sorted(act1.columns), axis=1)
exp1_sorted = exp1.sort_index().reindex(sorted(exp1.columns), axis=1)
assert_frame_equal(act1_sorted, exp1_sorted, check_dtype=True, check_index_type=True, check_column_type=True, check_names=True)

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
    # LeetCode does not specify row/column order for pivot result; sort index and columns before strict assertion
    act_sorted = act.sort_index().reindex(sorted(act.columns), axis=1)
    exp_sorted = exp.sort_index().reindex(sorted(exp.columns), axis=1)
    assert_frame_equal(act_sorted, exp_sorted, check_dtype=True, check_index_type=True, check_column_type=True, check_names=True)

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
