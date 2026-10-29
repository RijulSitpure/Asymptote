import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/drop-missing-data.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'id': [1, 2, 3], 'name': ['Alice', None, 'Charlie'], 'age': [20, 21, None]})
res = dropMissingData(df)
exp = df.iloc[[0, 2]]
assert_frame_equal(res, exp)

print("Passed all drop-missing-data tests")
