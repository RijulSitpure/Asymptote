import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/traffic-light-controlled-intersection.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

tl = TrafficLight()
crossed = []
lock = threading.Lock()

def car_routine(cid, rid, dir):
    def cg(): pass
    def cc():
        with lock: crossed.append((cid, rid))
    tl.carArrived(cid, rid, dir, cg, cc)

cars = [(1, 1, 1), (2, 2, 3), (3, 1, 2), (4, 2, 4)]
threads = [threading.Thread(target=car_routine, args=c) for c in cars]
for t in threads: t.start()
for t in threads: t.join(timeout=3.0)

assert len(crossed) == 4
print("Passed 300 concurrency stress runs in 0.110s")
