import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Follow (followee, follower) VALUES ('Alice', 'Bob'), ('Bob', 'Cena'), ('Bob', 'Dan'), ('Bob', 'Alice');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
