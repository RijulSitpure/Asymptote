import json

inserts = (
    "INSERT INTO Users VALUES (1, '2020-01-01', 'Lenovo'), (2, '2020-02-09', 'Samsung'), (3, '2020-01-19', 'LG'), (4, '2020-05-21', 'HP'); "
    "INSERT INTO Items VALUES (1, 'Lenovo'), (2, 'Samsung'), (3, 'LG'), (4, 'HP'); "
    "INSERT INTO Orders VALUES (1, '2020-08-01', 1, 2), (2, '2020-08-02', 2, 3), (3, '2020-08-03', 3, 2), (4, '2020-08-04', 1, 4), (5, '2020-08-05', 2, 4);"
)

print(json.dumps([{"name": "case_1", "inserts": inserts}]))
