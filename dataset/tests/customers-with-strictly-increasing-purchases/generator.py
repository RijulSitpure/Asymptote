import json
cases = [
    {
        "Orders": [
            {"order_id": 1, "customer_id": 1, "order_date": "2019-07-01", "price": 100},
            {"order_id": 2, "customer_id": 1, "order_date": "2019-11-07", "price": 100},
            {"order_id": 3, "customer_id": 1, "order_date": "2020-01-01", "price": 250},
            {"order_id": 4, "customer_id": 1, "order_date": "2021-02-15", "price": 500},
            {"order_id": 5, "customer_id": 2, "order_date": "2019-01-01", "price": 300},
            {"order_id": 6, "customer_id": 2, "order_date": "2020-01-01", "price": 200},
            {"order_id": 7, "customer_id": 3, "order_date": "2019-01-01", "price": 100},
            {"order_id": 8, "customer_id": 3, "order_date": "2021-01-01", "price": 300}
        ]
    }
]
print(json.dumps(cases))
