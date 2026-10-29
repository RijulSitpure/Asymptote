import json
cases = [
    {
        "Cinema": [
            {"seat_id": 1, "free": 1},
            {"seat_id": 2, "free": 0},
            {"seat_id": 3, "free": 1},
            {"seat_id": 4, "free": 1},
            {"seat_id": 5, "free": 1}
        ]
    }
]
print(json.dumps(cases))
