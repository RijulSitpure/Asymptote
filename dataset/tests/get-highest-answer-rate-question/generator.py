import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO SurveyLog (id, action, question_id, answer_id, q_num, timestamp) VALUES (5, 'show', 285, NULL, 1, 123), (5, 'answer', 285, 124124, 1, 124), (5, 'show', 369, NULL, 2, 125), (5, 'skip', 369, NULL, 2, 126);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
