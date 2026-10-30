import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Sales VALUES (1, 'LCPHONE', '2000-01-16'), (2, 'LCPhone', '2000-01-17'), (3, 'LcPhOnE', '2000-02-18'), (4, 'LCKeyCHAiN', '2000-02-19'), (5, 'LCKeyChain', '2000-02-28'), (6, 'Matryoshka', '2000-03-31');"
  }
]
print(json.dumps(cases))
