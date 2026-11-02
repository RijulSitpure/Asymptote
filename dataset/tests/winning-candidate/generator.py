import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Candidate (id, name) VALUES (1, 'A'), (2, 'B'), (3, 'C'), (4, 'D'), (5, 'E'); INSERT INTO Vote (id, candidateId) VALUES (1, 2), (2, 4), (3, 3), (4, 2), (5, 5);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
