import json
cases = [
    {
        "Customer": [
            {"customer_id": 1, "product_key": 5},
            {"customer_id": 2, "product_key": 6},
            {"customer_id": 3, "product_key": 5},
            {"customer_id": 3, "product_key": 6},
            {"customer_id": 1, "product_key": 6}
        ],
        "Product": [
            {"product_key": 5},
            {"product_key": 6}
        ]
    }
]
print(json.dumps(cases))
