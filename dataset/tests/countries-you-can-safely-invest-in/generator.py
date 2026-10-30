import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Person VALUES (3, 'Ahmet', '003-8888888'), (11, 'Yosef', '004-9999999'), (1, 'Rachel', '001-1234567'), (2, 'Monika', '001-7654321'), (7, 'Phileas', '002-1234567');\nINSERT INTO Country VALUES ('USA', '001'), ('Peru', '002'), ('Turkey', '003'), ('Israel', '004');\nINSERT INTO Calls VALUES (1, 2, 59), (3, 11, 102), (11, 7, 330), (7, 3, 100);"
  }
]
print(json.dumps(cases))
