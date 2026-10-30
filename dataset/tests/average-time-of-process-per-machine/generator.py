import random

def generate():
    machines = list(range(random.randint(2, 5)))
    rows = []
    for m in machines:
        num_procs = random.randint(1, 4)
        for p in range(num_procs):
            t_start = round(random.uniform(0.1, 10.0), 3)
            duration = round(random.uniform(0.05, 5.0), 3)
            t_end = round(t_start + duration, 3)
            rows.append((m, p, 'start', t_start))
            rows.append((m, p, 'end', t_end))
    random.shuffle(rows)
    inserts = []
    for r in rows:
        inserts.append(f"INSERT INTO Activity VALUES ({r[0]}, {r[1]}, '{r[2]}', {r[3]});")
    return "\n".join(inserts)

if __name__ == "__main__":
    print(generate())
