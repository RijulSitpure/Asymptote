import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Experiments VALUES (4, 'IOS', 'Programming'), (13, 'IOS', 'Sports'), (14, 'Android', 'Reading'), (8, 'Web', 'Reading'), (12, 'Web', 'Reading'), (18, 'Web', 'Programming');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
