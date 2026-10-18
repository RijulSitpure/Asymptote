import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'create-a-new-column.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_create(df):
    res = df.copy()
    res['bonus'] = res['salary'] * 2
    return res

# Fixed Cases
f1 = pd.DataFrame({
    'name': ['Piper', 'Grace', 'Georgia', 'Willow', 'Finn', 'Thomas'],
    'salary': [4548, 28150, 1103, 6593, 74576, 24433]
})
act1 = createBonusColumn(f1.copy())
exp1 = ref_create(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

f_empty = pd.DataFrame(columns=['name', 'salary'])
f_empty['salary'] = f_empty['salary'].astype(int)
act_empty = createBonusColumn(f_empty.copy())
exp_empty = ref_create(f_empty)
assert_frame_equal(act_empty, exp_empty, check_dtype=True)

# Random Cases
random.seed(42)
names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace']
for _ in range(25):
    sz = random.randint(1, 50)
    df = pd.DataFrame({
        'name': [random.choice(names) for _ in range(sz)],
        'salary': [random.randint(1000, 100000) for _ in range(sz)]
    })
    act = createBonusColumn(df.copy())
    exp = ref_create(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Case: 10,000 rows
sz = 10000
scale_df = pd.DataFrame({
    'name': [random.choice(names) for _ in range(sz)],
    'salary': [random.randint(2000, 200000) for _ in range(sz)]
})
t0 = time.perf_counter()
act_scale = createBonusColumn(scale_df.copy())
t1 = time.perf_counter()
exp_scale = ref_create(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 2 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
