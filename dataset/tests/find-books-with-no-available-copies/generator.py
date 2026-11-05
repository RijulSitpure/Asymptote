import json

def generate_cases():
    inserts = [
        "INSERT INTO library_books VALUES (1, 'Algorithms', 'CLRS', 2), (2, 'Design Patterns', 'GoF', 1), (3, 'Clean Code', 'Martin', 3);",
        "INSERT INTO borrowing_records VALUES (101, 1, 'Alice', '2024-01-01', NULL), (102, 1, 'Bob', '2024-01-02', NULL), (103, 2, 'Charlie', '2024-01-05', '2024-01-10'), (104, 3, 'David', '2024-01-06', NULL);"
    ]
    return [{"name": "example_1", "inserts": " ".join(inserts)}]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
