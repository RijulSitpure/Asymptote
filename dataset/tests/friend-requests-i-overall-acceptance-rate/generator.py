import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO FriendRequest (sender_id, send_to_id, request_date) VALUES (1, 2, '2016-06-01'), (1, 3, '2016-06-01'), (1, 4, '2016-06-01'), (2, 3, '2016-06-02'), (3, 4, '2016-06-09'); INSERT INTO RequestAccepted (requester_id, accepter_id, accept_date) VALUES (1, 2, '2016-06-03'), (1, 3, '2016-06-08'), (2, 3, '2016-06-08'), (3, 4, '2016-06-09'), (3, 4, '2016-06-10');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
