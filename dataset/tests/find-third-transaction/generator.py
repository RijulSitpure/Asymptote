import json

inserts = "INSERT INTO Transactions VALUES (1, 65.56, '2023-11-18 13:49:42'), (1, 9.60, '2023-11-30 02:47:26'), (1, 74.47, '2023-11-25 13:08:37'), (1, 27.46, '2023-11-12 03:47:21');"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
