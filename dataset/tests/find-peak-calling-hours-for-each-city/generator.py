import json

inserts = "INSERT INTO Calls VALUES (8, 4, '2021-08-24 21:04:00', 'Houston'), (11, 3, '2021-10-14 13:07:00', 'San Jose'), (8, 6, '2021-10-29 21:11:00', 'Houston'), (11, 9, '2021-09-07 13:05:00', 'San Jose');"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
