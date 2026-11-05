import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": [
                "INSERT INTO Products VALUES (1, 'Electronics', 1000);",
                "INSERT INTO Products VALUES (2, 'Clothing', 50);",
                "INSERT INTO Products VALUES (3, 'Electronics', 1200);",
                "INSERT INTO Products VALUES (4, 'Home', 500);",
                "INSERT INTO Discounts VALUES ('Electronics', 10);",
                "INSERT INTO Discounts VALUES ('Clothing', 20);"
            ]
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
