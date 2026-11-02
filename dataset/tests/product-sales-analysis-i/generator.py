import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Sales (sale_id, product_id, year, quantity, price) VALUES (1, 100, 2008, 10, 5000), (2, 100, 2009, 12, 5000), (7, 200, 2011, 15, 9000); INSERT INTO Product (product_id, product_name) VALUES (100, 'Nokia'), (200, 'Apple'), (300, 'Samsung');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
