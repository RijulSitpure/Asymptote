import random

def generate():
    dates = ['2020-12-08', '2020-12-07']
    makes = ['toyota', 'honda']
    inserts = []
    for _ in range(random.randint(6, 12)):
        d = random.choice(dates)
        m = random.choice(makes)
        l = random.randint(0, 3)
        p = random.randint(0, 3)
        inserts.append(f"INSERT INTO DailySales VALUES ('{d}', '{m}', {l}, {p});")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
