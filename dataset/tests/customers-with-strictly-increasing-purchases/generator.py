import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Orders (order_id, customer_id, order_date, price) VALUES (1, 1, '2019-07-01', 100), (2, 1, '2019-11-07', 100), (3, 1, '2020-01-01', 250), (4, 1, '2021-02-15', 500), (5, 2, '2019-01-01', 300), (6, 2, '2020-01-01', 200), (7, 3, '2019-01-01', 100), (8, 3, '2021-01-01', 300);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
