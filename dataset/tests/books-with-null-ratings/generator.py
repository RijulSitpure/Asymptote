import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO books VALUES (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 4.5);\nINSERT INTO books VALUES (2, 'To Kill a Mockingbird', 'Harper Lee', 1960, NULL);\nINSERT INTO books VALUES (3, '1984', 'George Orwell', 1949, 4.8);\nINSERT INTO books VALUES (4, 'Pride and Prejudice', 'Jane Austen', 1813, NULL);"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
