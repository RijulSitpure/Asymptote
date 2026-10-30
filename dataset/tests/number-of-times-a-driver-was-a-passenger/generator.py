import json

cases = [
  {
    "name": "standard_driver_passenger_rides",
    "inserts": "INSERT INTO Rides VALUES (1, 7, 1), (2, 7, 2), (3, 11, 7), (4, 11, 7), (5, 11, 4);"
  }
]
print(json.dumps(cases))
