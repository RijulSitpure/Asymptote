import json

def generate_cases():
    return [
        {
                "name": "example_1",
                "inserts": "INSERT INTO Products VALUES (1, 'Widget 123'), (2, 'Gadget 1234'), (3, 'Tool 007'), (4, 'Item 99');"
        }
]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
