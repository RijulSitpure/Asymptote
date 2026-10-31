import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Users VALUES (5, 'Smart CrockPot', '2021-09-01', 698882), (6, 'Smart Lock', '2021-09-14', 11487), (6, 'Smart Thermostat', '2021-09-10', 5747), (1, 'NextDesk', '2021-09-04', 390), (1, 'Ergonomic Chair', '2021-09-12', 450);"
  }
]
print(json.dumps(cases))
