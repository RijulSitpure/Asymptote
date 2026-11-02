import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Products (product_id, new_price, change_date) VALUES (1, 20, '2019-08-14'), (2, 50, '2019-08-14'), (1, 30, '2019-08-15'), (1, 35, '2019-08-16'), (2, 65, '2019-08-17'), (3, 20, '2019-08-18');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
