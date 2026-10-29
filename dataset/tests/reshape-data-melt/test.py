import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/reshape-data-melt.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'product': ['Umbrella'], 'quarter_1': [417], 'quarter_2': [224], 'quarter_3': [379], 'quarter_4': [611]})
res = meltTable(df)
assert list(res.columns) == ['product', 'quarter', 'sales']
assert len(res) == 4
print("Passed all reshape-data-melt tests")
