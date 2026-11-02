import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Seat (id, student) VALUES (1, 'Abbot'), (2, 'Doris'), (3, 'Emerson'), (4, 'Green'), (5, 'Jeames');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
