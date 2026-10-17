import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/building-h2o.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

def run_once(n):
    h2o = H2O()
    out = []
    lock = threading.Lock()
    def rel_h():
        with lock: out.append('H')
    def rel_o():
        with lock: out.append('O')
    
    threads = []
    for _ in range(2 * n):
        def wh():
            time.sleep(random.uniform(0.00001, 0.0005))
            h2o.hydrogen(rel_h)
        threads.append(threading.Thread(target=wh))
    for _ in range(n):
        def wo():
            time.sleep(random.uniform(0.00001, 0.0005))
            h2o.oxygen(rel_o)
        threads.append(threading.Thread(target=wo))
    
    random.shuffle(threads)
    for t in threads:
        t.start()
    for t in threads:
        t.join(timeout=5.0)
        if t.is_alive():
            raise TimeoutError('Thread failed to finish within 5.0 seconds (deadlock detected)')
    
    res = ''.join(out)
    if len(res) != 3 * n:
        raise AssertionError(f'Expected length {3*n}, got {len(res)}')
    if res.count('H') != 2 * n or res.count('O') != n:
        raise AssertionError(f'Expected {2*n} H and {n} O, got {res.count("H")} H and {res.count("O")} O')
    for j in range(0, len(res), 3):
        chunk = res[j:j+3]
        if chunk.count('H') != 2 or chunk.count('O') != 1:
            raise AssertionError(f'Molecule violation at chunk {j//3}: {chunk} does not contain 2 H and 1 O')

t0 = time.perf_counter()
TOTAL_RUNS = 300
for i in range(TOTAL_RUNS):
    n = random.randint(1, 15)
    run_once(n)
t1 = time.perf_counter()
print(f'Passed {TOTAL_RUNS} concurrency stress runs (random n=1..15) in {t1 - t0:.3f}s')
