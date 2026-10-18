import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'modify-columns.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_modify(df):
    res = df.copy()
    res['salary'] = res['salary'] * 2
    return res

# Fixed Cases
f1 = pd.DataFrame({
    'name': ['Jack', 'Piper', 'Mia', 'Ulysses'],
    'salary': [19666, 74754, 62509, 54866]
})
act1 = modifySalaryColumn(f1.copy())
exp1 = ref_modify(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

# Random Cases
random.seed(42)
names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace']
for _ in range(25):
    sz = random.randint(1, 50)
    df = pd.DataFrame({
        'name': [random.choice(names) for _ in range(sz)],
        'salary': [random.randint(1000, 100000) for _ in range(sz)]
    })
    act = modifySalaryColumn(df.copy())
    exp = ref_modify(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Case: 10,000 rows
sz = 10000
scale_df = pd.DataFrame({
    'name': [random.choice(names) for _ in range(sz)],
    'salary': [random.randint(2000, 200000) for _ in range(sz)]
})
t0 = time.perf_counter()
act_scale = modifySalaryColumn(scale_df.copy())
t1 = time.perf_counter()
exp_scale = ref_modify(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 1 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
