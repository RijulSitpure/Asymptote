import json
cases = [
    {
        "Employee": [
            {"id": 1, "company": "A", "salary": 2341},
            {"id": 2, "company": "A", "salary": 341},
            {"id": 3, "company": "A", "salary": 15},
            {"id": 4, "company": "A", "salary": 15314},
            {"id": 5, "company": "A", "salary": 451},
            {"id": 6, "company": "A", "salary": 513},
            {"id": 7, "company": "B", "salary": 15},
            {"id": 8, "company": "B", "salary": 13},
            {"id": 9, "company": "B", "salary": 1154},
            {"id": 10, "company": "B", "salary": 1345},
            {"id": 11, "company": "B", "salary": 1221},
            {"id": 12, "company": "B", "salary": 234},
            {"id": 13, "company": "C", "salary": 2345},
            {"id": 14, "company": "C", "salary": 2645},
            {"id": 15, "company": "C", "salary": 2645},
            {"id": 16, "company": "C", "salary": 2652},
            {"id": 17, "company": "C", "salary": 65}
        ]
    }
]
print(json.dumps(cases))
