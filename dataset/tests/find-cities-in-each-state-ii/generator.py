import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": [
                "INSERT INTO cities VALUES ('California', 'Los Angeles');",
                "INSERT INTO cities VALUES ('California', 'San Francisco');",
                "INSERT INTO cities VALUES ('California', 'San Diego');",
                "INSERT INTO cities VALUES ('Texas', 'Houston');",
                "INSERT INTO cities VALUES ('Texas', 'Austin');",
                "INSERT INTO cities VALUES ('Texas', 'Dallas');",
                "INSERT INTO cities VALUES ('New York', 'New York City');",
                "INSERT INTO cities VALUES ('New York', 'Buffalo');",
                "INSERT INTO cities VALUES ('New York', 'Rochester');"
            ]
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
