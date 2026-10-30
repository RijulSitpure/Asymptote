import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Spotify VALUES (303651, 'Heartless', 'The Weeknd'), (1046089, 'Save Your Tears', 'The Weeknd'), (510444, 'Starboy', 'The Weeknd'), (1046090, 'Blinding Lights', 'The Weeknd'), (303652, 'Levitating', 'Dua Lipa');"
  }
]
print(json.dumps(cases))
