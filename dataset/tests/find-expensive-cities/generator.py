import json

inserts = "INSERT INTO Listings VALUES (1, 'San Francisco', 750000), (2, 'Austin', 550000), (3, 'San Francisco', 800000), (4, 'Austin', 500000), (5, 'New York', 900000);"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
