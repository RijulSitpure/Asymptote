import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customer (customer_id, product_key) VALUES (1, 5), (2, 6), (3, 5), (3, 6), (1, 6); INSERT INTO Product (product_key) VALUES (5), (6);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
