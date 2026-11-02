import json
print(json.dumps([{"name": "case_1", "inserts": "INSERT INTO Flights VALUES (1, 2), (2, 2), (3, 1); INSERT INTO Passengers VALUES (101, 1), (102, 1), (103, 1), (104, 2), (105, 2);"}]))