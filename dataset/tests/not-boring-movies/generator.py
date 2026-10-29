import json
cases = [
    {
        "cinema": [
            {"id": 1, "movie": "War", "description": "great 3D", "rating": 8.9},
            {"id": 2, "movie": "Science", "description": "fiction", "rating": 8.5},
            {"id": 3, "movie": "irish", "description": "boring", "rating": 6.2},
            {"id": 4, "movie": "Ice song", "description": "Fantacy", "rating": 8.6},
            {"id": 5, "movie": "House card", "description": "Interesting", "rating": 9.1}
        ]
    }
]
print(json.dumps(cases))
