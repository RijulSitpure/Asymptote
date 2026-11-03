import json

inserts = """INSERT INTO Activities VALUES (7274, 123, 'open', 4.50), (2425, 123, 'send', 3.50), (1413, 456, 'send', 5.67), (1414, 789, 'open', 0.39), (2536, 456, 'open', 3.00); INSERT INTO Age VALUES (123, '31-35'), (456, '26-30'), (789, '21-25');"""

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
