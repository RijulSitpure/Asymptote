import json
cases = [
    {
        "Delivery": [
            {"delivery_id": 1, "customer_id": 1, "order_date": "2019-08-01", "customer_pref_delivery_date": "2019-08-02"},
            {"delivery_id": 2, "customer_id": 2, "order_date": "2019-08-02", "customer_pref_delivery_date": "2019-08-02"},
            {"delivery_id": 3, "customer_id": 1, "order_date": "2019-08-11", "customer_pref_delivery_date": "2019-08-12"},
            {"delivery_id": 4, "customer_id": 3, "order_date": "2019-08-24", "customer_pref_delivery_date": "2019-08-24"},
            {"delivery_id": 5, "customer_id": 3, "order_date": "2019-08-21", "customer_pref_delivery_date": "2019-08-22"},
            {"delivery_id": 6, "customer_id": 2, "order_date": "2019-08-11", "customer_pref_delivery_date": "2019-08-13"},
            {"delivery_id": 7, "customer_id": 4, "order_date": "2019-08-09", "customer_pref_delivery_date": "2019-08-09"}
        ]
    }
]
print(json.dumps(cases))
