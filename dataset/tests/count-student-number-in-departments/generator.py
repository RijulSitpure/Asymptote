import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Student (student_id, student_name, gender, dept_id) VALUES (1, 'Jack', 'M', 1), (2, 'Jane', 'F', 1), (3, 'Mark', 'M', 2); INSERT INTO Department (dept_id, dept_name) VALUES (1, 'Engineering'), (2, 'Science'), (3, 'Law');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
