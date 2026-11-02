import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Project (project_id, employee_id) VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 4); INSERT INTO Employee (employee_id, name, experience_years) VALUES (1, 'Khaled', 3), (2, 'Ali', 2), (3, 'John', 3), (4, 'Doe', 2);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
