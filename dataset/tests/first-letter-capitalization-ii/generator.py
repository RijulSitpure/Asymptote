import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO user_content VALUES (1, 'hello world of SQL');\nINSERT INTO user_content VALUES (2, 'the QUICK-brown fox');\nINSERT INTO user_content VALUES (3, 'modern-day DATA science');\nINSERT INTO user_content VALUES (4, 'web-based FRONT-end development');"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
