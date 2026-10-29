import json
cases = [
    {
        "Salary": [
            {"id": 1, "employee_id": 1, "amount": 9000, "pay_date": "2017-03-31"},
            {"id": 2, "employee_id": 2, "amount": 6000, "pay_date": "2017-03-31"},
            {"id": 3, "employee_id": 3, "amount": 10000, "pay_date": "2017-03-31"},
            {"id": 4, "employee_id": 1, "amount": 7000, "pay_date": "2017-02-28"},
            {"id": 5, "employee_id": 2, "amount": 6000, "pay_date": "2017-02-28"},
            {"id": 6, "employee_id": 3, "amount": 8000, "pay_date": "2017-02-28"}
        ],
        "Employee": [
            {"employee_id": 1, "department_id": 1},
            {"employee_id": 2, "department_id": 2},
            {"employee_id": 3, "department_id": 2}
        ]
    }
]
print(json.dumps(cases))
