import json
cases = [
    {
        "Activity": [
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "open_session"},
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "scroll_down"},
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "end_session"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-20", "activity_type": "open_session"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-21", "activity_type": "send_message"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-21", "activity_type": "end_session"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "open_session"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "send_message"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "end_session"},
            {"user_id": 4, "session_id": 3, "activity_date": "2019-06-25", "activity_type": "open_session"}
        ]
    }
]
print(json.dumps(cases))
