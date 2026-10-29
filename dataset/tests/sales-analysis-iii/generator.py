import json
cases = [
    {
        "Product": [
            {"product_id": 1, "product_name": "S8", "unit_price": 1000},
            {"product_id": 2, "product_name": "G4", "unit_price": 800},
            {"product_id": 3, "product_name": "iPhone", "unit_price": 1400}
        ],
        "Sales": [
            {"seller_id": 1, "product_id": 1, "buyer_id": 1, "sale_date": "2019-01-21", "quantity": 2, "price": 2000},
            {"seller_id": 1, "product_id": 2, "buyer_id": 2, "sale_date": "2019-02-17", "quantity": 1, "price": 800},
            {"seller_id": 2, "product_id": 2, "buyer_id": 3, "sale_date": "2019-06-02", "quantity": 1, "price": 800},
            {"seller_id": 3, "product_id": 3, "buyer_id": 4, "sale_date": "2019-05-13", "quantity": 2, "price": 2800}
        ]
    }
]
print(json.dumps(cases))
