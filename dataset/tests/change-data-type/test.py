import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/change-data-type.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'id': [1, 2], 'name': ['Ava', 'Kate'], 'age': [6, 15], 'grade': [73.0, 84.0]})
res = changeDatatype(df)
assert res['grade'].dtype == 'int64' or res['grade'].dtype == 'int32' or res['grade'].dtype == int
assert list(res['grade']) == [73, 84]
print("Passed all change-data-type tests")
