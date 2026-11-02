import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO HallEvents (hall_id, start_day, end_day) VALUES (1, '2023-01-13', '2023-01-14'), (1, '2023-01-14', '2023-01-17'), (1, '2023-01-18', '2023-01-25'), (2, '2022-12-09', '2022-12-23'), (2, '2022-12-13', '2022-12-17'), (3, '2022-12-01', '2023-01-30');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
