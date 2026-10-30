import json
cases = [
    {
        "Person": [
            {"person_id": 1, "name": "Alex", "profession": "Doctor"},
            {"person_id": 2, "name": "Alice", "profession": "Doctor"},
            {"person_id": 3, "name": "Bob", "profession": "Singer"},
            {"person_id": 4, "name": "Mike", "profession": "Singer"},
            {"person_id": 5, "name": "Angela", "profession": "Teacher"}
        ]
    }
]
print(json.dumps(cases))
