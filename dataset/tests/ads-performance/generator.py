import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Ads VALUES (1, 1, 'Clicked'), (2, 2, 'Clicked'), (3, 3, 'Viewed'), (5, 5, 'Ignored'), (1, 7, 'Ignored'), (2, 7, 'Viewed'), (3, 5, 'Clicked'), (1, 4, 'Viewed'), (2, 11, 'Viewed'), (1, 2, 'Clicked');"
  }
]
print(json.dumps(cases))
