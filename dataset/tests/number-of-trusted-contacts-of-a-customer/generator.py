import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Alice', 'alice@leetcode.com'), (2, 'Bob', 'bob@leetcode.com'), (13, 'John', 'john@leetcode.com'), (6, 'Alex', 'alex@leetcode.com');\nINSERT INTO Contacts VALUES (1, 'Bob', 'bob@leetcode.com'), (1, 'John', 'john@leetcode.com'), (1, 'Jal', 'jal@leetcode.com'), (2, 'Omar', 'omar@leetcode.com'), (2, 'Meir', 'meir@leetcode.com'), (6, 'Alice', 'alice@leetcode.com');\nINSERT INTO Invoices VALUES (77, 100, 1), (88, 200, 1), (99, 300, 2), (66, 400, 2), (55, 500, 13), (44, 600, 6);"
  }
]
print(json.dumps(cases))
