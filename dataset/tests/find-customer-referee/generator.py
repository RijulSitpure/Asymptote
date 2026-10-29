import json
cases = [
    {
        'name': 'standard_customers',
        'inserts': "INSERT INTO Customer VALUES (1, 'Will', null), (2, 'Jane', null), (3, 'Alex', 2), (4, 'Bill', null), (5, 'Zack', 1), (6, 'Mark', 2);"
    },
    {
        'name': 'all_referee_two',
        'inserts': "INSERT INTO Customer VALUES (1, 'Bob', 2), (2, 'Alice', 2);"
    }
]
print(json.dumps(cases))
