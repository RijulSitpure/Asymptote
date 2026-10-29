import json
cases = [
    {
        "Views": [
            {"article_id": 1, "author_id": 3, "viewer_id": 5, "view_date": "2019-08-01"},
            {"article_id": 3, "author_id": 4, "viewer_id": 5, "view_date": "2019-08-01"},
            {"article_id": 1, "author_id": 3, "viewer_id": 6, "view_date": "2019-08-02"},
            {"article_id": 2, "author_id": 7, "viewer_id": 7, "view_date": "2019-08-01"},
            {"article_id": 2, "author_id": 7, "viewer_id": 6, "view_date": "2019-08-02"},
            {"article_id": 4, "author_id": 7, "viewer_id": 1, "view_date": "2019-07-22"},
            {"article_id": 3, "author_id": 4, "viewer_id": 4, "view_date": "2019-07-21"},
            {"article_id": 3, "author_id": 4, "viewer_id": 4, "view_date": "2019-07-21"}
        ]
    }
]
print(json.dumps(cases))
