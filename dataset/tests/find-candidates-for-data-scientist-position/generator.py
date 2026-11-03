import json

inserts = """INSERT INTO Candidates VALUES (123, 'Python'), (123, 'Tableau'), (123, 'PostgreSQL'), (234, 'R'), (234, 'PowerBI'), (147, 'Python'), (147, 'Tableau'), (147, 'Java'), (147, 'PostgreSQL');"""

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
