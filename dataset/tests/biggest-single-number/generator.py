import json
cases = [
    {
        "MyNumbers": [
            {"num": 8},
            {"num": 8},
            {"num": 3},
            {"num": 3},
            {"num": 1},
            {"num": 4},
            {"num": 5},
            {"num": 6}
        ]
    }
]
print(json.dumps(cases))
