import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'select-data.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_select(df):
    return df[df['student_id'] == 101][['name', 'age']].reset_index(drop=True)

# Fixed Cases
f1 = pd.DataFrame({
    'student_id': [101, 102, 103, 104],
    'name': ['Ulysses', 'William', 'Vance', 'Carl'],
    'age': [13, 10, 12, 11]
})
act1 = selectData(f1.copy()).reset_index(drop=True)
exp1 = ref_select(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

f_no_101 = pd.DataFrame({
    'student_id': [102, 103],
    'name': ['Alice', 'Bob'],
    'age': [20, 21]
})
act_none = selectData(f_no_101.copy()).reset_index(drop=True)
exp_none = ref_select(f_no_101)
assert_frame_equal(act_none, exp_none, check_dtype=True)

# Random Cases
random.seed(42)
names = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda']
for _ in range(25):
    sz = random.randint(1, 40)
    has_target = random.choice([True, False])
    ids = list(range(102, 102 + sz))
    if has_target:
        ids[random.randint(0, sz - 1)] = 101
    df = pd.DataFrame({
        'student_id': ids,
        'name': [random.choice(names) for _ in range(sz)],
        'age': [random.randint(10, 25) for _ in range(sz)]
    })
    act = selectData(df.copy()).reset_index(drop=True)
    exp = ref_select(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Benchmark (10,000 rows)
sz = 10000
scale_df = pd.DataFrame({
    'student_id': list(range(200, 200 + sz)),
    'name': [random.choice(names) for _ in range(sz)],
    'age': [random.randint(15, 60) for _ in range(sz)]
})
scale_df.iloc[5000, 0] = 101
t0 = time.perf_counter()
act_scale = selectData(scale_df.copy()).reset_index(drop=True)
t1 = time.perf_counter()
exp_scale = ref_select(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 2 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
