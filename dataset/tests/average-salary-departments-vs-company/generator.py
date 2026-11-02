import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Salary (id, employee_id, amount, pay_date) VALUES (1, 1, 9000, '2017-03-31'), (2, 2, 6000, '2017-03-31'), (3, 3, 10000, '2017-03-31'), (4, 1, 7000, '2017-02-28'), (5, 2, 6000, '2017-02-28'), (6, 3, 8000, '2017-02-28'); INSERT INTO Employee (employee_id, department_id) VALUES (1, 1), (2, 2), (3, 2);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
