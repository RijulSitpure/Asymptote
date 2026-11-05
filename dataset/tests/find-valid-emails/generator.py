import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO Users VALUES (1, 'alice@example.com'), (2, 'bob_smith@domain.com'), (3, 'charlie@site123.com'), (4, 'invalid_email@com'), (5, 'user@domain.org'), (6, 'cool.user@domain.com'), (7, 'valid_123@abc.com');"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
