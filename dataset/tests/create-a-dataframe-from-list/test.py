import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/create-a-dataframe-from-list.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

# Fixed Cases
fixed_cases = [
    [],
    [[1, 15]],
    [[1, 15], [2, 11], [3, 12]],
    [[10, 20], [20, 30], [30, 40], [40, 50]]
]

for data in fixed_cases:
    act = createDataframe(data)
    exp_cols = ['student_id', 'age']
    exp = pd.DataFrame(data, columns=exp_cols)
    assert_frame_equal(act, exp, check_dtype=True, check_index_type=True, check_column_type=True, check_names=True)

# Random Cases
random.seed(42)
for i in range(25):
    n = random.randint(0, 100)
    data = [[random.randint(1, 10000), random.randint(10, 80)] for _ in range(n)]
    act = createDataframe(data)
    exp = pd.DataFrame(data, columns=['student_id', 'age'])
    assert_frame_equal(act, exp, check_dtype=True, check_index_type=True, check_column_type=True, check_names=True)

# Max Size
t0 = time.perf_counter()
max_data = [[i, 20 + (i % 50)] for i in range(10000)]
act_max = createDataframe(max_data)
t1 = time.perf_counter()
assert len(act_max) == 10000
print(f'Passed 4 fixed, 25 random, and 1 max-size (10,000 rows in {t1 - t0:.4f}s) tests')
