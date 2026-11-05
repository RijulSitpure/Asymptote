import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO products VALUES (1, 'Widget A', 'This is a sample product with SN1234-5678'), (2, 'Widget B', 'A product with serial SN9876-1234 in the description'), (3, 'Widget C', 'Product SN1234-56789 is available now'), (4, 'Widget D', 'No serial number here'), (5, 'Widget E', 'Check out SN4321-8765 in this description');"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
