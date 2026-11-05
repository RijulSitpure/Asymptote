import json

def generate_cases():
    inserts = [
        "INSERT INTO stores VALUES (1, 'Downtown Store', 'NYC'), (2, 'Uptown Store', 'NYC');",
        "INSERT INTO inventory VALUES (1, 101, 'Electronics', 100), (1, 102, 'Clothing', 10), (2, 201, 'Electronics', 50), (2, 202, 'Clothing', 40);"
    ]
    return [{"name": "example_1", "inserts": " ".join(inserts)}]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
