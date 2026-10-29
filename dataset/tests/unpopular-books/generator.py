import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Books VALUES (1, 'Kalila And Demna', '2010-01-01'), (2, '28 Letters', '2012-05-12'), (3, 'The Hobbit', '2019-06-10'), (4, '13 Reasons Why', '2019-06-01'), (5, 'The Hunger Games', '2008-09-21');\nINSERT INTO Orders VALUES (1, 1, 2, '2018-07-26'), (2, 1, 1, '2018-11-05'), (3, 3, 8, '2019-06-11'), (4, 4, 10, '2019-06-05'), (5, 5, 9, '2019-02-02');"
  }
]
print(json.dumps(cases))
