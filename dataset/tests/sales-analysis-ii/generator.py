import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Product (product_id, product_name, unit_price) VALUES (1, 'S8', 1000), (2, 'G4', 800), (3, 'iPhone', 1400); INSERT INTO Sales (seller_id, product_id, buyer_id, sale_date, quantity, price) VALUES (1, 1, 1, '2019-01-21', 2, 2000), (1, 2, 2, '2019-02-17', 1, 800), (2, 1, 3, '2019-06-02', 1, 800), (3, 3, 3, '2019-05-13', 2, 2800);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
