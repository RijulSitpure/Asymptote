import json
cases = [
    {
        'name': 'mixed_bonuses_and_nulls',
        'inserts': """INSERT INTO Employee VALUES (3, 'Brad', null, 4000), (1, 'John', 3, 1000), (2, 'Dan', 3, 2000), (4, 'Thomas', 3, 4000);
INSERT INTO Bonus VALUES (2, 500), (4, 2000);"""
    },
    {
        'name': 'all_have_large_bonus',
        'inserts': "INSERT INTO Employee VALUES (1, 'Alice', null, 5000); INSERT INTO Bonus VALUES (1, 5000);"
    }
]
print(json.dumps(cases))
