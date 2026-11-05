import random
from datetime import date, timedelta

def generate():
    users = [1, 2, 3, 4]
    actions = ['login', 'view', 'click']
    data = []
    base = date(2026, 1, 1)
    # User 1 has 3 consecutive days
    for d in range(3):
        data.append((1, str(base + timedelta(days=d)), 'login', 10))
    # User 2 has sporadic days
    data.append((2, str(base), 'view', 5))
    data.append((2, str(base + timedelta(days=2)), 'view', 5))
    return {'UserActions': data}
