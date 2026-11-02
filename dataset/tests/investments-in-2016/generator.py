import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Insurance (pid, tiv_2015, tiv_2016, lat, lon) VALUES (1, 10.0, 5.0, 10.0, 10.0), (2, 20.0, 20.0, 20.0, 20.0), (3, 10.0, 30.0, 20.0, 20.0), (4, 10.0, 40.0, 40.0, 40.0);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
