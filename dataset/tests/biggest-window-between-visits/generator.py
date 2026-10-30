import random

def generate():
    inserts = []
    users = [1, 2, 3]
    dates = ['2020-10-20', '2020-11-28', '2020-12-03', '2020-12-09', '2020-12-20']
    for u in users:
        sampled = sorted(random.sample(dates, random.randint(1, 4)))
        for d in sampled:
            inserts.append(f"INSERT INTO UserVisits VALUES ({u}, '{d}');")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
