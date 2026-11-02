import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Department (id, revenue, month) VALUES (1, 8000, 'Jan'), (2, 9000, 'Jan'), (3, 10000, 'Feb'), (1, 7000, 'Feb'), (1, 6000, 'Mar');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
