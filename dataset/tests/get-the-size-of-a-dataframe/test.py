import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/get-the-size-of-a-dataframe.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

# Fixed cases
assert getDataframeSize(pd.DataFrame({'a': [1, 2], 'b': [3, 4]})) == [2, 2]
assert getDataframeSize(pd.DataFrame()) == [0, 0]
assert getDataframeSize(pd.DataFrame({'a': [1, 2, 3, 4, 5]})) == [5, 1]

# Random cases
random.seed(42)
for i in range(25):
    r = random.randint(0, 50)
    c = random.randint(1, 10)
    df = pd.DataFrame({f'col_{j}': range(r) for j in range(c)})
    assert getDataframeSize(df) == [r, c]

print("Passed all get-the-size-of-a-dataframe tests")
