import random

def generate():
    products = [(0, 'Ham'), (1, 'Bacon'), (2, 'Cheese'), (3, 'Milk')]
    inserts = []
    for p in products:
        inserts.append(f"INSERT INTO Product VALUES ({p[0]}, '{p[1]}');")
    inv_id = 1
    for p in products:
        for _ in range(random.randint(0, 3)):
            r, pd_, c, rf = [random.randint(0, 50) for _ in range(4)]
            inserts.append(f"INSERT INTO Invoice VALUES ({inv_id}, {p[0]}, {r}, {pd_}, {c}, {rf});")
            inv_id += 1
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
