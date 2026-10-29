import json
cases = [
    {
        'name': 'standard_three_salaries',
        'inserts': "INSERT INTO Employee VALUES (1, 100), (2, 200), (3, 300);"
    },
    {
        'name': 'duplicate_salaries',
        'inserts': "INSERT INTO Employee VALUES (1, 100), (2, 100);"
    }
]
print(json.dumps(cases))
