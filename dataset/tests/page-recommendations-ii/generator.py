import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Friendship VALUES (1, 2);
INSERT INTO Friendship VALUES (1, 3);
INSERT INTO Friendship VALUES (1, 4);
INSERT INTO Friendship VALUES (2, 3);
INSERT INTO Friendship VALUES (2, 4);
INSERT INTO Friendship VALUES (2, 5);
INSERT INTO Friendship VALUES (6, 1);
INSERT INTO Likes VALUES (1, 88);
INSERT INTO Likes VALUES (2, 23);
INSERT INTO Likes VALUES (3, 24);
INSERT INTO Likes VALUES (4, 56);
INSERT INTO Likes VALUES (5, 11);
INSERT INTO Likes VALUES (6, 33);
INSERT INTO Likes VALUES (2, 77);
INSERT INTO Likes VALUES (3, 77);
INSERT INTO Likes VALUES (6, 88);
"""
    }
]
print(json.dumps(cases))
