import json
cases = [
    {
        "Salary": [
            {"id": 1, "name": "A", "sex": "m", "salary": 2500},
            {"id": 2, "name": "B", "sex": "f", "salary": 1500},
            {"id": 3, "name": "C", "sex": "m", "salary": 5500},
            {"id": 4, "name": "D", "sex": "f", "salary": 500}
        ]
    }
]
print(json.dumps(cases))
