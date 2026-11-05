import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO Teams VALUES (1, 'Arsenal'), (2, 'Arsenal'), (3, 'Chelsea'), (4, 'Chelsea');\nINSERT INTO Passes VALUES (1, '10:00', 2), (2, '20:00', 3), (3, '30:00', 4), (4, '50:00', 3), (3, '60:00', 1);"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
