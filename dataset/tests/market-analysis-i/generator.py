import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Users (user_id, join_date, favorite_brand) VALUES (1, '2018-01-01', 'Lenovo'), (2, '2018-02-09', 'Samsung'), (3, '2018-01-19', 'LG'), (4, '2018-05-21', 'HP'); INSERT INTO Orders (order_id, order_date, item_id, buyer_id, seller_id) VALUES (1, '2019-08-01', 4, 1, 2), (2, '2018-08-02', 2, 1, 3), (3, '2019-08-03', 3, 2, 3), (4, '2018-08-04', 1, 4, 2), (5, '2018-08-04', 1, 3, 4), (6, '2019-08-05', 2, 2, 4); INSERT INTO Items (item_id, item_brand) VALUES (1, 'Samsung'), (2, 'Lenovo'), (3, 'LG'), (4, 'HP');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
