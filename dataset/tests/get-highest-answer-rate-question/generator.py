import json
cases = [
    {
        "SurveyLog": [
            {"id": 5, "action": "show", "question_id": 285, "answer_id": None, "q_num": 1, "timestamp": 123},
            {"id": 5, "action": "answer", "question_id": 285, "answer_id": 124124, "q_num": 1, "timestamp": 124},
            {"id": 5, "action": "show", "question_id": 369, "answer_id": None, "q_num": 2, "timestamp": 125},
            {"id": 5, "action": "skip", "question_id": 369, "answer_id": None, "q_num": 2, "timestamp": 126}
        ]
    }
]
print(json.dumps(cases))
