import json

def generate_cases():
    return [
        {
                "name": "example_1",
                "inserts": "INSERT INTO Scores VALUES (101, 'Math', 70, '2023-01-15'), (101, 'Math', 85, '2023-02-15'), (101, 'Physics', 65, '2023-01-15'), (101, 'Physics', 60, '2023-02-15'), (102, 'Math', 80, '2023-01-15');"
        }
]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
