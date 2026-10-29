import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Products VALUES (1, 'Leetcode Solutions', 'Book'), (2, 'Jewels of Stringology', 'Book'), (3, 'HP', 'Laptop'), (4, 'Lenovo', 'Laptop'), (5, 'Leetcode Kit', 'T-shirt');\nINSERT INTO Orders VALUES (1, '2020-02-05', 60), (1, '2020-02-10', 70), (2, '2020-01-18', 30), (2, '2020-02-11', 80), (3, '2020-02-17', 2), (3, '2020-02-24', 3), (4, '2020-03-01', 20), (4, '2020-03-04', 30), (4, '2020-03-04', 60), (5, '2020-02-25', 50), (5, '2020-02-27', 50), (5, '2020-03-01', 50);"
  }
]
print(json.dumps(cases))
