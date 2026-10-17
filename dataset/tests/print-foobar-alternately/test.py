import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/print-foobar-alternately.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

def run_once(n):
    fb = FooBar(n)
    out = []
    lock = threading.Lock()
    def pf():
        with lock: out.append('foo')
    def pb():
        with lock: out.append('bar')
    
    def worker_foo():
        time.sleep(random.uniform(0.00001, 0.0005))
        fb.foo(pf)
    def worker_bar():
        time.sleep(random.uniform(0.00001, 0.0005))
        fb.bar(pb)

    threads = [
        threading.Thread(target=worker_foo),
        threading.Thread(target=worker_bar)
    ]
    random.shuffle(threads)
    for t in threads:
        t.start()
    for t in threads:
        t.join(timeout=5.0)
        if t.is_alive():
            raise TimeoutError('Thread failed to finish within 5.0 seconds (deadlock detected)')
    
    res = ''.join(out)
    expected = 'foobar' * n
    if res != expected:
        raise AssertionError(f'Interleaving mismatch: expected {expected[:20]}..., got {res[:20]}...')

t0 = time.perf_counter()
TOTAL_RUNS = 300
for i in range(TOTAL_RUNS):
    n = random.randint(1, 20)
    run_once(n)
t1 = time.perf_counter()
print(f'Passed {TOTAL_RUNS} concurrency stress runs (random n=1..20) in {t1 - t0:.3f}s')
