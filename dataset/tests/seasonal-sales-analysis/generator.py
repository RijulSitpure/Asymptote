import json

def generate_cases():
    inserts = [
        "INSERT INTO products VALUES (1, 'Fan', 'Appliances'), (2, 'Heater', 'Appliances'), (3, 'Book', 'Media');",
        "INSERT INTO sales VALUES (1, 1, '2024-07-15', 10, 25.00), (2, 2, '2024-01-10', 8, 45.00), (3, 3, '2024-04-12', 15, 12.00);"
    ]
    return [
        {
            "name": "example_1",
            "inserts": " ".join(inserts)
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
