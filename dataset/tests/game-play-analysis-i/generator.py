import json
cases = [
    {
        'name': 'basic_sessions',
        'inserts': """INSERT INTO Activity VALUES (1, 2, '2016-03-01', 5), (1, 2, '2016-05-02', 6), (2, 3, '2017-06-25', 1), (3, 1, '2016-03-02', 0), (3, 4, '2018-07-03', 5);"""
    },
    {
        'name': 'single_session_per_player',
        'inserts': "INSERT INTO Activity VALUES (1, 1, '2020-01-01', 10), (2, 2, '2020-01-02', 20);"
    }
]
print(json.dumps(cases))
