import json
cases = [
    {
        "Student": [
            {"name": "Jack", "continent": "America"},
            {"name": "Pascal", "continent": "Europe"},
            {"name": "Xi", "continent": "Asia"},
            {"name": "Jane", "continent": "America"}
        ]
    }
]
print(json.dumps(cases))
