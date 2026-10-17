import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/drop-duplicate-rows.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

def ref_drop_duplicates(df):
    seen = set()
    keep_indices = []
    for idx, email in enumerate(df['email']):
        if email not in seen:
            seen.add(email)
            keep_indices.append(idx)
    if len(keep_indices) == len(df):
        return df.copy()
    return df.iloc[keep_indices]

# Fixed Cases
f1 = pd.DataFrame(columns=['customer_id', 'name', 'email'])
f2 = pd.DataFrame({
    'customer_id': [1, 2, 3],
    'name': ['Ella', 'David', 'Zachary'],
    'email': ['emily@example.com', 'michael@example.com', 'sarah@example.com']
})
f3 = pd.DataFrame({
    'customer_id': [1, 2, 3, 4, 5, 6],
    'name': ['Ella', 'David', 'Zachary', 'Alice', 'Finn', 'Violet'],
    'email': ['emily@example.com', 'michael@example.com', 'sarah@example.com', 'emily@example.com', 'john@example.com', 'john@example.com']
})
f4 = pd.DataFrame({
    'customer_id': [1, 2, 3],
    'name': ['A', None, 'C'],
    'email': ['dup@example.com', 'dup@example.com', 'dup@example.com']
})

for df in [f1, f2, f3, f4]:
    act = dropDuplicateEmails(df.copy())
    exp = ref_drop_duplicates(df)
    assert_frame_equal(act, exp, check_dtype=True, check_index_type=True, check_column_type=True, check_names=True)

# Random Cases
random.seed(42)
emails_pool = [f'user_{i}@domain.com' for i in range(15)]
for _ in range(25):
    n = random.randint(0, 80)
    rows = []
    for cid in range(1, n + 1):
        name = f'Name_{cid}' if random.random() > 0.1 else None
        email = random.choice(emails_pool)
        rows.append({'customer_id': cid, 'name': name, 'email': email})
    df_rand = pd.DataFrame(rows, columns=['customer_id', 'name', 'email'])
    act = dropDuplicateEmails(df_rand.copy())
    exp = ref_drop_duplicates(df_rand)
    assert_frame_equal(act, exp, check_dtype=True, check_index_type=True, check_column_type=True, check_names=True)

# 100,000-row Scale Test Case
t0 = time.perf_counter()
scale_rows = [{'customer_id': i, 'name': f'Cust_{i}', 'email': f'cust_{i % 5000}@test.com'} for i in range(100000)]
df_scale = pd.DataFrame(scale_rows)
act_scale = dropDuplicateEmails(df_scale)
t1 = time.perf_counter()
scale_runtime = t1 - t0
assert len(act_scale) == 5000
print(f'Passed 4 fixed, 25 random, and 1 scale (100,000 rows in {scale_runtime:.4f}s) tests')
