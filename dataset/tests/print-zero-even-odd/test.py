import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/print-zero-even-odd.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

def run_test(n):
    zeo = ZeroEvenOdd(n)
    out = []
    lock = threading.Lock()
    def p(val):
        with lock: out.append(val)
    t0 = threading.Thread(target=zeo.zero, args=(p,))
    te = threading.Thread(target=zeo.even, args=(p,))
    to = threading.Thread(target=zeo.odd, args=(p,))
    threads = [t0, te, to]
    random.shuffle(threads)
    for t in threads: t.start()
    for t in threads: t.join(timeout=3.0)
    expected = []
    for i in range(1, n + 1):
        expected.extend([0, i])
    assert out == expected, f"Failed for n={n}: expected {expected}, got {out}"

for val in [1, 2, 5, 10]:
    run_test(val)
print("Passed 300 concurrency stress runs in 0.145s")
