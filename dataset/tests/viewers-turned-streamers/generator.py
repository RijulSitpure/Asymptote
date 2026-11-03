import json

inserts = "INSERT INTO Sessions VALUES (101, '2023-11-01 10:00:00', '2023-11-01 11:00:00', 1, 'Viewer'), (101, '2023-11-02 12:00:00', '2023-11-02 13:00:00', 2, 'Streamer'), (102, '2023-11-01 09:00:00', '2023-11-01 10:30:00', 3, 'Streamer'), (103, '2023-11-01 14:00:00', '2023-11-01 15:00:00', 4, 'Viewer');"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
