import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO Samples VALUES (1, 'ATGCTAGCTAA', 'Human'), (2, 'GGGTCAATAT', 'Mouse'), (3, 'ATATATCGTAG', 'Zebrafish'), (4, 'CCCCGGGTTT', 'FruitFly');"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
