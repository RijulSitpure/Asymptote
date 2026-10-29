import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Movies VALUES (1, 'Avengers'), (2, 'Frozen 2'), (3, 'Joker');\nINSERT INTO Users VALUES (1, 'Daniel'), (2, 'Monica'), (3, 'Maria'), (4, 'James');\nINSERT INTO MovieRating VALUES (1, 1, 3, '2020-01-12'), (1, 2, 4, '2020-02-11'), (1, 3, 2, '2020-02-12'), (1, 4, 1, '2020-01-01'), (2, 1, 5, '2020-02-17'), (2, 2, 2, '2020-02-01'), (2, 3, 2, '2020-03-01'), (3, 1, 3, '2020-02-22'), (3, 2, 4, '2020-02-25');"
  }
]
print(json.dumps(cases))
