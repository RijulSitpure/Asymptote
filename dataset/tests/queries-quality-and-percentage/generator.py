import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Queries VALUES ('Dog', 'Golden Retriever', 1, 5), ('Dog', 'German Shepherd', 2, 5), ('Dog', 'Mule', 200, 1), ('Cat', 'Shirazi', 5, 2), ('Cat', 'Siamese', 3, 3), ('Cat', 'Sphynx', 7, 4);"
  }
]
print(json.dumps(cases))
