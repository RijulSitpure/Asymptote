import random
import string

def generate():
    n = random.randint(3, 8)
    names = ['aLiCe', 'bOB', 'chARLie', 'dAvId', 'EVE', 'fRAnK', 'gRaCe', 'hENRy']
    random.shuffle(names)
    inserts = []
    for uid in range(1, n + 1):
        name = names[uid - 1]
        inserts.append(f"INSERT INTO Users VALUES ({uid}, '{name}');")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
