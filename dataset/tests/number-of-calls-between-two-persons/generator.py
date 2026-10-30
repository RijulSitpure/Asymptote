import random

def generate():
    inserts = []
    n = random.randint(5, 12)
    for _ in range(n):
        a = random.randint(1, 4)
        b = random.randint(1, 4)
        while a == b:
            b = random.randint(1, 4)
        dur = random.randint(10, 200)
        inserts.append(f"INSERT INTO Calls VALUES ({a}, {b}, {dur});")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
