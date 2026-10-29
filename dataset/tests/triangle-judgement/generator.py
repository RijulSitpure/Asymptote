import json
cases = [
    {
        'name': 'standard_triangles',
        'inserts': "INSERT INTO Triangle VALUES (13, 15, 30), (10, 20, 15);"
    },
    {
        'name': 'degenerate_cases',
        'inserts': "INSERT INTO Triangle VALUES (3, 4, 7), (5, 5, 5);"
    }
]
print(json.dumps(cases))
