import random
import string

def generate():
    n = random.randint(3, 8)
    inserts = []
    for tid in range(1, n + 1):
        length = random.choice([5, 10, 15, 16, 25])
        content = ''.join(random.choices(string.ascii_letters + ' ', k=length))
        inserts.append(f"INSERT INTO Tweets VALUES ({tid}, '{content}');")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
