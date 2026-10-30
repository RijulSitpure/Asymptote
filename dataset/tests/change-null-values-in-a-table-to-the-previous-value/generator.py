import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO CoffeeShop VALUES (9, 'Daiquiri'), (6, NULL), (7, NULL), (3, 'Espresso'), (1, 'Ice Coffee'), (2, NULL);"
  }
]
print(json.dumps(cases))
