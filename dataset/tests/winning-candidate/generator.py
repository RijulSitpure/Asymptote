import json
cases = [
    {
        "Candidate": [
            {"id": 1, "name": "A"},
            {"id": 2, "name": "B"},
            {"id": 3, "name": "C"},
            {"id": 4, "name": "D"},
            {"id": 5, "name": "E"}
        ],
        "Vote": [
            {"id": 1, "candidateId": 2},
            {"id": 2, "candidateId": 4},
            {"id": 3, "candidateId": 3},
            {"id": 4, "candidateId": 2},
            {"id": 5, "candidateId": 5}
        ]
    }
]
print(json.dumps(cases))
