import json
cases = [
    {
        "Numbers": [
            {"num": 0, "frequency": 7},
            {"num": 1, "frequency": 1},
            {"num": 2, "frequency": 3},
            {"num": 3, "frequency": 1}
        ]
    }
]
print(json.dumps(cases))
