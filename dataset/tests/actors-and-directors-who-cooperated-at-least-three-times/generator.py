import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO ActorDirector (actor_id, director_id, timestamp) VALUES (1, 1, 0), (1, 1, 1), (1, 1, 2), (1, 2, 3), (1, 2, 4), (2, 1, 5), (2, 1, 6);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
