import json

cases = [
  {
    "name": "example1",
    "inserts": "INSERT INTO TeamPoints VALUES (3, 'Algeria', 1431), (1, 'Senegal', 2132), (2, 'New Zealand', 1402), (4, 'Croatia', 1817); INSERT INTO PointsChange VALUES (3, 399), (1, -283), (2, 400), (4, -400);"
  }
]
print(json.dumps(cases))
