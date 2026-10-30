import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Users VALUES (1, 'Winston', 'winston@leetcode.com'), (2, 'Jonathan', 'jonathanisgreat'), (3, 'Annabelle', 'bella-@leetcode.com'), (4, 'Sally', 'sally.come@leetcode.com'), (5, 'Marwan', 'quarz#2020@leetcode.com'), (6, 'David', 'david69@gmail.com'), (7, 'Shapiro', '.shapiro@leetcode.com');"
  }
]
print(json.dumps(cases))
