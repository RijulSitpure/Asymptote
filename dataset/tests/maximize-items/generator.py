import json

inserts = """INSERT INTO Inventory VALUES (1374, 'prime_eligible', 'mini refrigerator', 68.00), (4245, 'not_prime', 'standing lamp', 26.40), (2452, 'prime_eligible', 'television', 85.00), (3255, 'not_prime', 'side table', 22.60), (1672, 'prime_eligible', 'laptop', 8.50);"""

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
