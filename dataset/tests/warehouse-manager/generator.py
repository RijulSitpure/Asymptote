import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Warehouse VALUES ('LCHouse1', 1, 1), ('LCHouse1', 2, 10), ('LCHouse1', 3, 5), ('LCHouse2', 1, 2), ('LCHouse2', 2, 2), ('LCHouse3', 1, 1);\nINSERT INTO Products VALUES (1, 'LC-TV', 5, 50, 40), (2, 'LC-KeyChain', 5, 5, 5), (3, 'LC-Phone', 2, 10, 10);"
  }
]
print(json.dumps(cases))
