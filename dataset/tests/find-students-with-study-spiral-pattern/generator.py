import json

def generate_cases():
    inserts = [
        "INSERT INTO students VALUES (1, 'Alice', 'CS'), (2, 'Bob', 'Math');",
        "INSERT INTO study_sessions VALUES (1, 1, '2024-01-01', 'Math', 4.0), (2, 1, '2024-01-02', 'CS', 3.5), (3, 1, '2024-01-03', 'Physics', 5.0), (4, 2, '2024-01-01', 'Math', 2.0);"
    ]
    return [{"name": "example_1", "inserts": " ".join(inserts)}]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
