import json

def generate_cases():
    return [
        {
                "name": "example_1",
                "inserts": "INSERT INTO logs VALUES (1, '192.168.1.1', 200), (2, '256.1.1.1', 404), (3, '192.168.01.1', 200), (4, '10.0.0.1', 200), (5, '999.999.999.999', 500), (6, '256.1.1.1', 400), (7, '192.168.1', 500);"
        }
]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
