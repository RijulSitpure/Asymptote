import json

cases = [
  {
    "name": "standard_product_stores",
    "inserts": "INSERT INTO Products VALUES (1, 'Shop', 110), (1, 'LC_Store', 100), (2, 'Nozama', 200), (2, 'Souq', 190);"
  }
]
print(json.dumps(cases))
