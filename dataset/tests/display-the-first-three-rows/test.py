import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/display-the-first-three-rows.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df1 = pd.DataFrame({'id': [1, 2, 3, 4], 'val': ['a', 'b', 'c', 'd']})
assert_frame_equal(selectFirstRows(df1), df1.iloc[:3])

df2 = pd.DataFrame({'id': [1, 2], 'val': ['a', 'b']})
assert_frame_equal(selectFirstRows(df2), df2)

print("Passed all display-the-first-three-rows tests")
