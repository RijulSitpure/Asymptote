import json
cases = [
    {
        "HallEvents": [
            {"hall_id": 1, "start_day": "2023-01-13", "end_day": "2023-01-14"},
            {"hall_id": 1, "start_day": "2023-01-14", "end_day": "2023-01-17"},
            {"hall_id": 1, "start_day": "2023-01-18", "end_day": "2023-01-25"},
            {"hall_id": 2, "start_day": "2022-12-09", "end_day": "2022-12-23"},
            {"hall_id": 2, "start_day": "2022-12-13", "end_day": "2022-12-17"},
            {"hall_id": 3, "start_day": "2022-12-01", "end_day": "2023-01-30"}
        ]
    }
]
print(json.dumps(cases))
