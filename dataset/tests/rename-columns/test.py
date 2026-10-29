import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/rename-columns.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'id': [1], 'first_name': ['A'], 'last_name': ['B'], 'age': [15]})
res = renameColumns(df)
assert list(res.columns) == ['student_id', 'first_name', 'last_name', 'age_in_years']
print("Passed all rename-columns tests")
