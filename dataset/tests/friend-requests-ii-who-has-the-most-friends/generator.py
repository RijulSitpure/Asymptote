import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO RequestAccepted (requester_id, accepter_id, accept_date) VALUES (1, 2, '2016-06-03'), (1, 3, '2016-06-08'), (2, 3, '2016-06-08'), (3, 4, '2016-06-09');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
