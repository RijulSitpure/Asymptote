import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": [
                "INSERT INTO SeasonStats VALUES (2021, 1, 'Manchester City', 38, 29, 6, 3, 99, 26);",
                "INSERT INTO SeasonStats VALUES (2021, 2, 'Liverpool', 38, 28, 8, 2, 94, 26);",
                "INSERT INTO SeasonStats VALUES (2021, 3, 'Chelsea', 38, 21, 11, 6, 76, 33);",
                "INSERT INTO SeasonStats VALUES (2022, 1, 'Manchester City', 38, 28, 5, 5, 94, 33);",
                "INSERT INTO SeasonStats VALUES (2022, 4, 'Arsenal', 38, 26, 6, 6, 88, 43);"
            ]
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
