import json

inserts = [
    "INSERT INTO Projects (project_id, skill, importance) VALUES (1, 'Python', 4);",
    "INSERT INTO Projects (project_id, skill, importance) VALUES (1, 'SQL', 3);",
    "INSERT INTO Candidates (candidate_id, skill, proficiency) VALUES (101, 'Python', 5);",
    "INSERT INTO Candidates (candidate_id, skill, proficiency) VALUES (101, 'SQL', 3);",
    "INSERT INTO Candidates (candidate_id, skill, proficiency) VALUES (102, 'Python', 3);",
    "INSERT INTO Candidates (candidate_id, skill, proficiency) VALUES (102, 'SQL', 4);"
]

print(json.dumps([{"name": "case_1", "inserts": inserts}]))
