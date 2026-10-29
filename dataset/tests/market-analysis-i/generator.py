import json
cases = [
    {
        "Users": [
            {"user_id": 1, "join_date": "2018-01-01", "favorite_brand": "Lenovo"},
            {"user_id": 2, "join_date": "2018-02-09", "favorite_brand": "Samsung"},
            {"user_id": 3, "join_date": "2018-01-19", "favorite_brand": "LG"},
            {"user_id": 4, "join_date": "2018-05-21", "favorite_brand": "HP"}
        ],
        "Orders": [
            {"order_id": 1, "order_date": "2019-08-01", "item_id": 4, "buyer_id": 1, "seller_id": 2},
            {"order_id": 2, "order_date": "2018-08-02", "item_id": 2, "buyer_id": 1, "seller_id": 3},
            {"order_id": 3, "order_date": "2019-08-03", "item_id": 3, "buyer_id": 2, "seller_id": 3},
            {"order_id": 4, "order_date": "2018-08-04", "item_id": 1, "buyer_id": 4, "seller_id": 2},
            {"order_id": 5, "order_date": "2018-08-04", "item_id": 1, "buyer_id": 3, "seller_id": 4},
            {"order_id": 6, "order_date": "2019-08-05", "item_id": 2, "buyer_id": 2, "seller_id": 4}
        ],
        "Items": [
            {"item_id": 1, "item_brand": "Samsung"},
            {"item_id": 2, "item_brand": "Lenovo"},
            {"item_id": 3, "item_brand": "LG"},
            {"item_id": 4, "item_brand": "HP"}
        ]
    }
]
print(json.dumps(cases))
