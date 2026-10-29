import json
cases = [
    {
        "ActorDirector": [
            {"actor_id": 1, "director_id": 1, "timestamp": 0},
            {"actor_id": 1, "director_id": 1, "timestamp": 1},
            {"actor_id": 1, "director_id": 1, "timestamp": 2},
            {"actor_id": 1, "director_id": 2, "timestamp": 3},
            {"actor_id": 1, "director_id": 2, "timestamp": 4},
            {"actor_id": 2, "director_id": 1, "timestamp": 5},
            {"actor_id": 2, "director_id": 1, "timestamp": 6}
        ]
    }
]
print(json.dumps(cases))
