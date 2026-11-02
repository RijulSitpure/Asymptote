import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Activity (player_id, device_id, event_date, games_played) VALUES (1, 2, '2016-03-01', 5), (1, 2, '2016-05-02', 6), (1, 3, '2017-06-25', 1), (3, 1, '2016-03-02', 0), (3, 4, '2018-07-03', 5);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
