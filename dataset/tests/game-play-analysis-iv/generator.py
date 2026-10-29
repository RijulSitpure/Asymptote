import json
cases = [
    {
        "Activity": [
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-01", "games_played": 5},
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-02", "games_played": 6},
            {"player_id": 2, "device_id": 3, "event_date": "2017-06-25", "games_played": 1},
            {"player_id": 3, "device_id": 1, "event_date": "2016-03-02", "games_played": 0},
            {"player_id": 3, "device_id": 4, "event_date": "2018-07-03", "games_played": 5}
        ]
    }
]
print(json.dumps(cases))
