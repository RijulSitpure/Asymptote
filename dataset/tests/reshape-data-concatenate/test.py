import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/reshape-data-concatenate.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df1 = pd.DataFrame({'id': [1], 'name': ['A']})
df2 = pd.DataFrame({'id': [2], 'name': ['B']})
res = concatenateTables(df1, df2)
assert len(res) == 2
print("Passed all reshape-data-concatenate tests")
