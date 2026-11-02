import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Views (article_id, author_id, viewer_id, view_date) VALUES (1, 3, 5, '2019-08-01'), (1, 3, 6, '2019-08-02'), (2, 7, 7, '2019-08-01'), (2, 7, 6, '2019-08-02'), (4, 7, 1, '2019-07-22'), (3, 4, 4, '2019-07-21'), (3, 4, 4, '2019-07-21');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
