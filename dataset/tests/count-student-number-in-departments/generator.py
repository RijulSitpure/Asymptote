import json
cases = [
    {
        "Student": [
            {"student_id": 1, "student_name": "Jack", "gender": "M", "dept_id": 1},
            {"student_id": 2, "student_name": "Jane", "gender": "F", "dept_id": 1},
            {"student_id": 3, "student_name": "Mark", "gender": "M", "dept_id": 2}
        ],
        "Department": [
            {"dept_id": 1, "dept_name": "Engineering"},
            {"dept_id": 2, "dept_name": "Science"},
            {"dept_id": 3, "dept_name": "Law"}
        ]
    }
]
print(json.dumps(cases))
