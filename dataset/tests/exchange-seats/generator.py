import json
cases = [
    {
        "Seat": [
            {"id": 1, "student": "Abbot"},
            {"id": 2, "student": "Doris"},
            {"id": 3, "student": "Emerson"},
            {"id": 4, "student": "Green"},
            {"id": 5, "student": "Jeames"}
        ]
    }
]
print(json.dumps(cases))
