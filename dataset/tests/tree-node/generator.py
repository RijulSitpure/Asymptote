import json
cases = [
    {
        'name': 'standard_tree',
        'inserts': "INSERT INTO Tree VALUES (1, null), (2, 1), (3, 1), (4, 2), (5, 2);"
    },
    {
        'name': 'single_node_tree',
        'inserts': "INSERT INTO Tree VALUES (1, null);"
    }
]
print(json.dumps(cases))
