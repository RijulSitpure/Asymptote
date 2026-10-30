import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Playback VALUES (1, 1, 1, 5);
INSERT INTO Playback VALUES (2, 1, 15, 23);
INSERT INTO Playback VALUES (3, 2, 10, 12);
INSERT INTO Playback VALUES (4, 2, 17, 28);
INSERT INTO Playback VALUES (5, 2, 2, 8);
INSERT INTO Ads VALUES (1, 1, 5);
INSERT INTO Ads VALUES (2, 2, 17);
INSERT INTO Ads VALUES (3, 2, 20);
"""
    }
]
print(json.dumps(cases))
