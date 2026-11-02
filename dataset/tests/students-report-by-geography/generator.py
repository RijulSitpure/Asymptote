import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Student (name, continent) VALUES ('Jack', 'America'), ('Pascal', 'Europe'), ('Xi', 'Asia'), ('Jane', 'America');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
