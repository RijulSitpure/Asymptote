import json

inserts = """INSERT INTO Toppings VALUES ('Pepperoni', 0.50), ('Sausage', 0.70), ('Chicken', 0.55), ('Extra Cheese', 0.40);"""

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
