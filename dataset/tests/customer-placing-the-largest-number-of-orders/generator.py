import json
cases = [
    {
        'name': 'standard_orders',
        'inserts': "INSERT INTO Orders VALUES (1, 1), (2, 2), (3, 3), (4, 3);"
    },
    {
        'name': 'single_customer',
        'inserts': "INSERT INTO Orders VALUES (1, 5), (2, 5), (3, 5);"
    }
]
print(json.dumps(cases))
