import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO Teams VALUES (1, 'Arsenal'), (2, 'Arsenal'), (3, 'Arsenal'), (4, 'Chelsea'), (5, 'Chelsea');\nINSERT INTO Passes VALUES (1, '00:15', 2), (2, '00:45', 3), (3, '01:15', 4), (4, '02:00', 5), (5, '02:30', 4);"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
