import os, sys, json, time, random, threading

# Load solution from problem JSON
script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/print-in-order.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

def run_once():
    foo = Foo()
    out = []
    lock = threading.Lock()
    def pf():
        with lock: out.append('first')
    def ps():
        with lock: out.append('second')
    def pt():
        with lock: out.append('third')
    
    def worker1():
        time.sleep(random.uniform(0.00001, 0.0005))
        foo.first(pf)
    def worker2():
        time.sleep(random.uniform(0.00001, 0.0005))
        foo.second(ps)
    def worker3():
        time.sleep(random.uniform(0.00001, 0.0005))
        foo.third(pt)

    threads = [
        threading.Thread(target=worker1),
        threading.Thread(target=worker2),
        threading.Thread(target=worker3)
    ]
    random.shuffle(threads)
    for t in threads:
        t.start()
    for t in threads:
        t.join(timeout=5.0)
        if t.is_alive():
            raise TimeoutError('Thread failed to finish within 5.0 seconds (deadlock detected)')
    
    res = ''.join(out)
    if res != 'firstsecondthird':
        raise AssertionError(f'Incorrect ordering: expected firstsecondthird, got {res}')

t0 = time.perf_counter()
TOTAL_RUNS = 300
for i in range(TOTAL_RUNS):
    run_once()
t1 = time.perf_counter()
print(f'Passed {TOTAL_RUNS} concurrency stress runs in {t1 - t0:.3f}s')
