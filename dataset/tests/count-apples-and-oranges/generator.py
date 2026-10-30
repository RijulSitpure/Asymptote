import random

def generate():
    inserts = []
    chests = [(1, 5, 6), (2, 10, 20), (3, 0, 4)]
    for c in chests:
        inserts.append(f"INSERT INTO Chests VALUES ({c[0]}, {c[1]}, {c[2]});")
    num_boxes = random.randint(3, 6)
    for b in range(1, num_boxes + 1):
        cid = random.choice([1, 2, 3, 'NULL'])
        a = random.randint(0, 15)
        o = random.randint(0, 15)
        inserts.append(f"INSERT INTO Boxes VALUES ({b}, {cid}, {a}, {o});")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
