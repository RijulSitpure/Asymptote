import json
cases = [
    {
        "Elements": [
            {"symbol": "He", "type": "Noble", "electrons": 0},
            {"symbol": "Na", "type": "Metal", "electrons": 1},
            {"symbol": "Ca", "type": "Metal", "electrons": 2},
            {"symbol": "La", "type": "Metal", "electrons": 3},
            {"symbol": "Cl", "type": "Nonmetal", "electrons": 1},
            {"symbol": "O", "type": "Nonmetal", "electrons": 2},
            {"symbol": "N", "type": "Nonmetal", "electrons": 3}
        ]
    }
]
print(json.dumps(cases))
