import json
cases = [
    {
        "Employee": [
            {"id": 1, "month": 1, "salary": 20},
            {"id": 2, "month": 1, "salary": 20},
            {"id": 1, "month": 2, "salary": 30},
            {"id": 2, "month": 2, "salary": 30},
            {"id": 3, "month": 2, "salary": 40},
            {"id": 1, "month": 3, "salary": 40},
            {"id": 3, "month": 3, "salary": 60},
            {"id": 1, "month": 4, "salary": 60},
            {"id": 3, "month": 4, "salary": 70}
        ]
    }
]
print(json.dumps(cases))
