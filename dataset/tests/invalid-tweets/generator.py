import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Tweets VALUES (1, 'NuCUiFhKsxVzZo t');\nINSERT INTO Tweets VALUES (2, 'bGhnixo TU');\nINSERT INTO Tweets VALUES (3, 'JRiPD');\nINSERT INTO Tweets VALUES (4, 'vfDCaZcopxfTJzm');\nINSERT INTO Tweets VALUES (5, 'MOJsRsdiafjogbJSFMCVoLUIb');\nINSERT INTO Tweets VALUES (6, 'vhsUVGPTqRYNuBZdulsldhjPi');\nINSERT INTO Tweets VALUES (7, 'sOhjx');\nINSERT INTO Tweets VALUES (8, 'FSFoIUwhexU QCS');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
