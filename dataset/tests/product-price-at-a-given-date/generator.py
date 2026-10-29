import json
cases = [
    {
        "Products": [
            {"product_id": 1, "new_price": 20, "change_date": "2019-08-14"},
            {"product_id": 2, "new_price": 50, "change_date": "2019-08-14"},
            {"product_id": 1, "new_price": 30, "change_date": "2019-08-15"},
            {"product_id": 1, "new_price": 35, "change_date": "2019-08-16"},
            {"product_id": 2, "new_price": 65, "change_date": "2019-08-17"},
            {"product_id": 3, "new_price": 20, "change_date": "2019-08-18"}
        ]
    }
]
print(json.dumps(cases))
