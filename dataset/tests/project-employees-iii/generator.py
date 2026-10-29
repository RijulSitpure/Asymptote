import json
cases = [
    {
        "Project": [
            {"project_id": 1, "employee_id": 1},
            {"project_id": 1, "employee_id": 2},
            {"project_id": 1, "employee_id": 3},
            {"project_id": 2, "employee_id": 1},
            {"project_id": 2, "employee_id": 4}
        ],
        "Employee": [
            {"employee_id": 1, "name": "Khaled", "experience_years": 3},
            {"employee_id": 2, "name": "Ali", "experience_years": 2},
            {"employee_id": 3, "name": "John", "experience_years": 3},
            {"employee_id": 4, "name": "Doe", "experience_years": 2}
        ]
    }
]
print(json.dumps(cases))
