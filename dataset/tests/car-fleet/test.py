#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'car-fleet.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_car_fleet(target, position, speed):
    cars = sorted(zip(position, speed), reverse=True)
    fleets = 0
    lead_time = 0.0
    for pos, spd in cars:
        time_needed = (target - pos) / spd
        if time_needed > lead_time:
            fleets += 1
            lead_time = time_needed
    return fleets

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (12, [10,8,0,5,3], [2,4,1,1,3], 3),
        (10, [3], [3], 1),
        (100, [0,2,4], [4,2,1], 1),
        (10, [], [], 0),
        (10, [6, 8], [3, 2], 2)
    ]
    for target, pos, spd, exp in fixed:
        assert solver.carFleet(target, pos, spd) == exp

    rng = random.Random(42)
    for _ in range(50):
        n = rng.randint(1, 40)
        target = rng.randint(100, 1000)
        pos = rng.sample(range(0, target), n)
        spd = [rng.randint(1, 50) for _ in range(n)]
        assert solver.carFleet(target, pos, spd) == ref_car_fleet(target, pos, spd)

    # Max-size test: N = 20,000
    target = 1000000
    pos = list(range(0, 20000))
    spd = [rng.randint(1, 100) for _ in range(20000)]
    t0 = time.perf_counter()
    ans = solver.carFleet(target, pos, spd)
    t1 = time.perf_counter()
    assert ans == ref_car_fleet(target, pos, spd)
    print(f"✓ Car Fleet: fixed, 50 random cases, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
