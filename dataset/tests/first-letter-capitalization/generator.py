import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO user_content VALUES (1, 'hello world of SQL');\nINSERT INTO user_content VALUES (2, 'the QUICK brown fox');\nINSERT INTO user_content VALUES (3, 'data science AND machine learning');\nINSERT INTO user_content VALUES (4, 'TOP rated programming BOOKS');"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
