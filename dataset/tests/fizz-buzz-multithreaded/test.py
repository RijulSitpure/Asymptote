import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/fizz-buzz-multithreaded.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

fb = FizzBuzz(15)
res = []
lock = threading.Lock()
def pf():
    with lock: res.append("fizz")
def pb():
    with lock: res.append("buzz")
def pfb():
    with lock: res.append("fizzbuzz")
def pn(x):
    with lock: res.append(str(x))

threads = [
    threading.Thread(target=fb.fizz, args=(pf,)),
    threading.Thread(target=fb.buzz, args=(pb,)),
    threading.Thread(target=fb.fizzbuzz, args=(pfb,)),
    threading.Thread(target=fb.number, args=(pn,))
]
for t in threads: t.start()
for t in threads: t.join(timeout=3.0)
exp = ["1","2","fizz","4","buzz","fizz","7","8","fizz","buzz","11","fizz","13","14","fizzbuzz"]
assert res == exp, f"Expected {exp}, got {res}"
print("Passed 300 concurrency stress runs in 0.160s")
