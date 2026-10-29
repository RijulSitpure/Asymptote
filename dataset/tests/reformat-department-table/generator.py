import json
cases = [
    {
        "Department": [
            {"id": 1, "revenue": 8000, "month": "Jan"},
            {"id": 2, "revenue": 9000, "month": "Jan"},
            {"id": 3, "revenue": 10000, "month": "Feb"},
            {"id": 1, "revenue": 7000, "month": "Feb"},
            {"id": 1, "revenue": 6000, "month": "Mar"}
        ]
    }
]
print(json.dumps(cases))
