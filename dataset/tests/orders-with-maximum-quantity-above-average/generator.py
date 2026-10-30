import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO OrdersDetails VALUES (1, 1, 1, 12);
INSERT INTO OrdersDetails VALUES (1, 2, 1, 10);
INSERT INTO OrdersDetails VALUES (1, 3, 1, 15);
INSERT INTO OrdersDetails VALUES (2, 1, 1, 8);
INSERT INTO OrdersDetails VALUES (2, 4, 1, 4);
INSERT INTO OrdersDetails VALUES (2, 5, 1, 6);
INSERT INTO OrdersDetails VALUES (3, 3, 1, 20);
INSERT INTO OrdersDetails VALUES (3, 2, 1, 8);
"""
    }
]
print(json.dumps(cases))
