import json
cases = [
    {
        "FriendRequest": [
            {"sender_id": 1, "send_to_id": 2, "request_date": "2016-06-01"},
            {"sender_id": 1, "send_to_id": 3, "request_date": "2016-06-01"},
            {"sender_id": 1, "send_to_id": 4, "request_date": "2016-06-01"},
            {"sender_id": 2, "send_to_id": 3, "request_date": "2016-06-02"},
            {"sender_id": 3, "send_to_id": 4, "request_date": "2016-06-09"}
        ],
        "RequestAccepted": [
            {"requester_id": 1, "accepter_id": 2, "accept_date": "2016-06-03"},
            {"requester_id": 1, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 2, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 3, "accepter_id": 4, "accept_date": "2016-06-09"},
            {"requester_id": 3, "accepter_id": 4, "accept_date": "2016-06-10"}
        ]
    }
]
print(json.dumps(cases))
