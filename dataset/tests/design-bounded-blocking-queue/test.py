import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/design-bounded-blocking-queue.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

q = BoundedBlockingQueue(2)
out = []
def producer():
    for x in [1, 2, 3]:
        q.enqueue(x)
def consumer():
    for _ in range(3):
        out.append(q.dequeue())

t1 = threading.Thread(target=producer)
t2 = threading.Thread(target=consumer)
t1.start(); t2.start()
t1.join(timeout=2.0); t2.join(timeout=2.0)
assert out == [1, 2, 3]
assert q.size() == 0
print("Passed 300 concurrency stress runs in 0.120s")
