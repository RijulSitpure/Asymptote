import random

def generate():
    inserts = []
    pairs = set()
    for _ in range(random.randint(5, 12)):
        u = random.randint(0, 3)
        f = random.randint(0, 5)
        if (u, f) not in pairs:
            pairs.add((u, f))
            inserts.append(f"INSERT INTO Followers VALUES ({u}, {f});")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
