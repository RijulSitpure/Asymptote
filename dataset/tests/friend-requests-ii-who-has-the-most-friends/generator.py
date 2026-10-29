import json
cases = [
    {
        "RequestAccepted": [
            {"requester_id": 1, "accepter_id": 2, "accept_date": "2016-06-03"},
            {"requester_id": 1, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 2, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 3, "accepter_id": 4, "accept_date": "2016-06-09"}
        ]
    }
]
print(json.dumps(cases))
