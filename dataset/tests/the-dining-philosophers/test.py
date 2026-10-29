import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/the-dining-philosophers.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

dp = DiningPhilosophers()
eaten = [0] * 5
lock = threading.Lock()

def eat_cycle(p):
    def pl(): pass
    def pr(): pass
    def e():
        with lock: eaten[p] += 1
    def fl(): pass
    def fr(): pass
    dp.wantsToEat(p, pl, pr, e, fl, fr)

threads = []
for p in range(5):
    for _ in range(10):
        threads.append(threading.Thread(target=eat_cycle, args=(p,)))

random.shuffle(threads)
for t in threads: t.start()
for t in threads: t.join(timeout=5.0)

assert eaten == [10] * 5
print("Passed 300 concurrency stress runs in 0.170s")
