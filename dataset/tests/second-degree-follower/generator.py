import json
cases = [
    {
        "Follow": [
            {"followee": "Alice", "follower": "Bob"},
            {"followee": "Bob", "follower": "Cena"},
            {"followee": "Bob", "follower": "Dan"},
            {"followee": "Bob", "follower": "Alice"}
        ]
    }
]
print(json.dumps(cases))
