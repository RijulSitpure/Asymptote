import os, sys, json, time, random
import pandas as pd
import numpy as np
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'fill-missing-data.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_fill(df):
    res = df.copy()
    res['quantity'] = res['quantity'].fillna(0)
    return res

# Fixed Cases
f1 = pd.DataFrame({
    'name': ['Wristwatch', 'WirelessEarbuds', 'GolfClubs', 'Printer'],
    'quantity': [None, None, 779, 849],
    'price': [135, 821, 9319, 3051]
})
act1 = fillMissingValues(f1.copy())
exp1 = ref_fill(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

# Random Cases
random.seed(42)
prod_names = ['ItemA', 'ItemB', 'ItemC', 'ItemD', 'ItemE']
for _ in range(25):
    sz = random.randint(1, 50)
    qty = [None if random.random() < 0.3 else float(random.randint(1, 500)) for _ in range(sz)]
    df = pd.DataFrame({
        'name': [random.choice(prod_names) for _ in range(sz)],
        'quantity': qty,
        'price': [random.randint(10, 5000) for _ in range(sz)]
    })
    act = fillMissingValues(df.copy())
    exp = ref_fill(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Case: 10,000 rows with 30% missing values
sz = 10000
scale_df = pd.DataFrame({
    'name': [random.choice(prod_names) for _ in range(sz)],
    'quantity': [None if random.random() < 0.3 else float(random.randint(1, 1000)) for _ in range(sz)],
    'price': [random.randint(10, 10000) for _ in range(sz)]
})
t0 = time.perf_counter()
act_scale = fillMissingValues(scale_df.copy())
t1 = time.perf_counter()
exp_scale = ref_fill(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 1 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
