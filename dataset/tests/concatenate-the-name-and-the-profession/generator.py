import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Person (person_id, name, profession) VALUES (1, 'Alex', 'Doctor'), (2, 'Alice', 'Doctor'), (3, 'Bob', 'Singer'), (4, 'Mike', 'Singer'), (5, 'Angela', 'Teacher');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
