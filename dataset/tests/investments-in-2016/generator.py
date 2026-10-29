import json
cases = [
    {
        "Insurance": [
            {"pid": 1, "tiv_2015": 10.0, "tiv_2016": 5.0, "lat": 10.0, "lon": 10.0},
            {"pid": 2, "tiv_2015": 20.0, "tiv_2016": 20.0, "lat": 20.0, "lon": 20.0},
            {"pid": 3, "tiv_2015": 10.0, "tiv_2016": 30.0, "lat": 20.0, "lon": 20.0},
            {"pid": 4, "tiv_2015": 10.0, "tiv_2016": 40.0, "lat": 40.0, "lon": 40.0}
        ]
    }
]
print(json.dumps(cases))
