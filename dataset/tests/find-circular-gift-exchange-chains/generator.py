import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO SecretSanta VALUES (1, 2, 20), (2, 3, 30), (3, 1, 40), (4, 5, 15), (5, 4, 25);"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
