import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Books VALUES (1, 'Book Alpha', 'Author A', 'Fiction'), (2, 'Book Beta', 'Author B', 'Non-Fiction'), (3, 'Book Gamma', 'Author C', 'Sci-Fi');\nINSERT INTO Reviews VALUES (101, 1, 5, '2026-01-01'), (102, 1, 5, '2026-01-02'), (103, 1, 4, '2026-01-03'), (104, 1, 1, '2026-01-04'), (105, 1, 2, '2026-01-05'), (201, 2, 3, '2026-01-01'), (202, 2, 3, '2026-01-02'), (203, 2, 3, '2026-01-03'), (204, 2, 3, '2026-01-04'), (205, 2, 3, '2026-01-05'), (301, 3, 5, '2026-01-01'), (302, 3, 1, '2026-01-02'), (303, 3, 5, '2026-01-03');"
  }
]

print(json.dumps(cases))
