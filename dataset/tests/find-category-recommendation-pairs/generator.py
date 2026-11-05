import json

def generate_cases():
    inserts = [
        "INSERT INTO ProductInfo VALUES (1, 'Books', 15.00), (2, 'Electronics', 120.00), (3, 'Clothing', 35.00);",
        "INSERT INTO ProductPurchases VALUES (1, 1, 1), (1, 2, 1), (2, 1, 2), (2, 2, 1), (3, 1, 1), (3, 2, 2), (4, 1, 1);"
    ]
    return [
        {
            "name": "example_1",
            "inserts": " ".join(inserts)
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
