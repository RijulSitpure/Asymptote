import json

def generate_cases():
    inserts = [
        "INSERT INTO ProductInfo VALUES (1, 'Electronics', 100.00), (2, 'Books', 20.00), (3, 'Clothing', 50.00);",
        "INSERT INTO ProductPurchases VALUES (1, 1, 1), (1, 2, 1), (2, 1, 2), (2, 2, 1), (3, 1, 1), (3, 2, 3), (4, 1, 1);"
    ]
    return [
        {
            "name": "example_1",
            "inserts": " ".join(inserts)
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
