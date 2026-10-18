import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

const TESTS = {
  'min-stack': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'min-stack.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    MinStack = scope['MinStack']

    # Test 1: standard sequence
    ms = MinStack()
    ms.push(-2)
    ms.push(0)
    ms.push(-3)
    assert ms.getMin() == -3
    ms.pop()
    assert ms.top() == 0
    assert ms.getMin() == -2

    # Test 2: duplicate minimums
    ms2 = MinStack()
    ms2.push(5)
    ms2.push(2)
    ms2.push(2)
    assert ms2.getMin() == 2
    ms2.pop()
    assert ms2.getMin() == 2
    ms2.pop()
    assert ms2.getMin() == 5

    # Test 3: stress / randomized
    rng = random.Random(42)
    ms3 = MinStack()
    ref = []
    t0 = time.perf_counter()
    for _ in range(10000):
        op = rng.choice(['push', 'pop', 'top', 'getMin']) if ref else 'push'
        if op == 'push':
            v = rng.randint(-1000, 1000)
            ref.append(v)
            ms3.push(v)
        elif op == 'pop':
            ref.pop()
            ms3.pop()
        elif op == 'top':
            assert ms3.top() == ref[-1]
        elif op == 'getMin':
            assert ms3.getMin() == min(ref)
    t1 = time.perf_counter()

    print(f"✓ Min Stack: standard, duplicate, and 10,000 randomized operations passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'evaluate-reverse-polish-notation': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'evaluate-reverse-polish-notation.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t == '+':
            stack.append(stack.pop() + stack.pop())
        elif t == '-':
            b = stack.pop(); a = stack.pop()
            stack.append(a - b)
        elif t == '*':
            stack.append(stack.pop() * stack.pop())
        elif t == '/':
            b = stack.pop(); a = stack.pop()
            stack.append(int(a / b))
        else:
            stack.append(int(t))
    return stack[0]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (["2","1","+","3","*"], 9),
        (["4","13","5","/","+"], 6),
        (["10","6","9","3","+","-11","*","/","*","17","+","5","+"], 22),
        (["42"], 42),
        (["-3","-4","+"], -7),
        (["-6","132","/"], 0)
    ]
    for tokens, exp in fixed:
        assert solver.evalRPN(tokens) == exp

    # Random valid RPN generation
    rng = random.Random(42)
    for _ in range(50):
        depth = 1
        seq = [str(rng.randint(-50, 50))]
        for _ in range(rng.randint(2, 30)):
            if depth >= 2 and rng.random() < 0.4:
                seq.append(rng.choice(['+', '-', '*']))
                depth -= 1
            else:
                val = rng.randint(-50, 50)
                if val == 0: val = 1
                seq.append(str(val))
                depth += 1
        while depth > 1:
            seq.append(rng.choice(['+', '-', '*']))
            depth -= 1
        assert solver.evalRPN(seq) == ref_eval_rpn(seq)

    # Max-size test: N = 10,000
    big_tokens = ["1"] * 5001 + ["+"] * 5000
    t0 = time.perf_counter()
    ans = solver.evalRPN(big_tokens)
    t1 = time.perf_counter()
    assert ans == 5001
    print(f"✓ Evaluate Reverse Polish Notation: fixed, 50 random cases, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'car-fleet': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'car-fleet.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
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
`,

  'largest-rectangle-in-histogram': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'largest-rectangle-in-histogram.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_largest_rectangle(heights):
    n = len(heights)
    max_area = 0
    for i in range(n):
        min_h = heights[i]
        for j in range(i, n):
            min_h = min(min_h, heights[j])
            max_area = max(max_area, min_h * (j - i + 1))
    return max_area

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 1, 5, 6, 2, 3], 10),
        ([2, 4], 4),
        ([], 0),
        ([1], 1),
        ([5, 5, 5, 5], 20),
        ([1, 2, 3, 4, 5], 9),
        ([5, 4, 3, 2, 1], 9),
        ([0, 0, 0], 0)
    ]
    for h, exp in fixed:
        assert solver.largestRectangleArea(h) == exp

    rng = random.Random(42)
    for _ in range(40):
        n = rng.randint(1, 35)
        h = [rng.randint(0, 50) for _ in range(n)]
        assert solver.largestRectangleArea(h) == ref_largest_rectangle(h)

    # Max-size test: N = 20,000
    big_h = [rng.randint(0, 10000) for _ in range(20000)]
    t0 = time.perf_counter()
    ans = solver.largestRectangleArea(big_h)
    t1 = time.perf_counter()
    assert ans > 0
    print(f"✓ Largest Rectangle in Histogram: fixed, 40 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'binary-search': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'binary-search.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([-1, 0, 3, 5, 9, 12], 9, 4),
        ([-1, 0, 3, 5, 9, 12], 2, -1),
        ([5], 5, 0),
        ([5], -5, -1),
        ([], 1, -1),
        ([1, 2], 1, 0),
        ([1, 2], 2, 1),
        ([1, 2], 3, -1)
    ]
    for nums, target, exp in fixed:
        assert solver.search(nums, target) == exp

    rng = random.Random(42)
    for _ in range(50):
        n = rng.randint(1, 100)
        nums = sorted(list(set(rng.randint(-500, 500) for _ in range(n))))
        if rng.random() < 0.5 and nums:
            target = rng.choice(nums)
            exp = nums.index(target)
        else:
            target = rng.randint(-600, 600)
            exp = nums.index(target) if target in nums else -1
        assert solver.search(nums, target) == exp

    # Large test: N = 50,000
    big = list(range(50000))
    t0 = time.perf_counter()
    ans = solver.search(big, 49999)
    t1 = time.perf_counter()
    assert ans == 49999
    assert solver.search(big, -1) == -1
    print(f"✓ Binary Search: fixed, 50 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'search-a-2d-matrix': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'search-a-2d-matrix.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3, True),
        ([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13, False),
        ([[1]], 1, True),
        ([[1]], 0, False),
        ([], 1, False),
        ([[]], 1, False)
    ]
    for mat, target, exp in fixed:
        assert solver.searchMatrix(mat, target) == exp

    rng = random.Random(42)
    for _ in range(50):
        m = rng.randint(1, 10)
        n = rng.randint(1, 10)
        vals = sorted(list(set(rng.randint(-100, 100) for _ in range(m * n))))
        while len(vals) < m * n: vals.append(vals[-1] + 1)
        mat = [vals[i * n : (i + 1) * n] for i in range(m)]
        target = rng.choice(vals) if rng.random() < 0.5 else rng.randint(-120, 120)
        exp = any(target in row for row in mat)
        assert solver.searchMatrix(mat, target) == exp

    # Large 100x100 matrix
    vals = list(range(10000))
    mat = [vals[i * 100 : (i + 1) * 100] for i in range(100)]
    t0 = time.perf_counter()
    assert solver.searchMatrix(mat, 9999) is True
    assert solver.searchMatrix(mat, 10001) is False
    t1 = time.perf_counter()
    print(f"✓ Search a 2D Matrix: fixed, 50 random, and 100x100 matrix passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'koko-eating-bananas': `#!/usr/bin/env python3
import json, os, re, random, time, math

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'koko-eating-bananas.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_koko(piles, h):
    def feasible(k):
        return sum(math.ceil(p / k) for p in piles) <= h
    left, right = 1, max(piles)
    while left < right:
        mid = (left + right) // 2
        if feasible(mid):
            right = mid
        else:
            left = mid + 1
    return left

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 6, 7, 11], 8, 4),
        ([30, 11, 23, 4, 20], 5, 30),
        ([30, 11, 23, 4, 20], 6, 23),
        ([312884470], 312884469, 2),
        ([1, 1, 1, 1], 4, 1)
    ]
    for piles, h, exp in fixed:
        assert solver.minEatingSpeed(piles, h) == exp

    rng = random.Random(42)
    for _ in range(40):
        n = rng.randint(1, 25)
        piles = [rng.randint(1, 200) for _ in range(n)]
        h = rng.randint(n, n * 10)
        assert solver.minEatingSpeed(piles, h) == ref_koko(piles, h)

    # Max-size test: N = 10,000, h = 10^9
    big_piles = [rng.randint(1, 10**9) for _ in range(10000)]
    t0 = time.perf_counter()
    ans = solver.minEatingSpeed(big_piles, 10**9)
    t1 = time.perf_counter()
    assert ans >= 1
    print(f"✓ Koko Eating Bananas: fixed, 40 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'find-minimum-in-rotated-sorted-array': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'find-minimum-in-rotated-sorted-array.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 4, 5, 1, 2], 1),
        ([4, 5, 6, 7, 0, 1, 2], 0),
        ([11, 13, 15, 17], 11),
        ([1], 1),
        ([2, 1], 1),
        ([1, 2], 1)
    ]
    for nums, exp in fixed:
        assert solver.findMin(nums) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 60)
        vals = sorted(list(set(rng.randint(-500, 500) for _ in range(sz))))
        rot = rng.randint(0, len(vals) - 1)
        rotated = vals[rot:] + vals[:rot]
        assert solver.findMin(rotated) == vals[0]

    # Max-size test: N = 20,000
    big = list(range(20000))
    big_rotated = big[7777:] + big[:7777]
    t0 = time.perf_counter()
    ans = solver.findMin(big_rotated)
    t1 = time.perf_counter()
    assert ans == 0
    print(f"✓ Find Minimum in Rotated Sorted Array: fixed, 50 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'search-in-rotated-sorted-array': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'search-in-rotated-sorted-array.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([4, 5, 6, 7, 0, 1, 2], 0, 4),
        ([4, 5, 6, 7, 0, 1, 2], 3, -1),
        ([1], 0, -1),
        ([1], 1, 0),
        ([3, 1], 1, 1),
        ([5, 1, 3], 5, 0),
        ([5, 1, 3], 3, 2),
        ([4, 5, 6, 7, 8, 1, 2, 3], 8, 4)
    ]
    for nums, target, exp in fixed:
        assert solver.search(nums, target) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 50)
        vals = sorted(list(set(rng.randint(-500, 500) for _ in range(sz))))
        rot = rng.randint(0, len(vals) - 1)
        rotated = vals[rot:] + vals[:rot]
        target = rng.choice(rotated) if rng.random() < 0.6 else rng.randint(-600, 600)
        exp = rotated.index(target) if target in rotated else -1
        assert solver.search(rotated, target) == exp

    # Large test: N = 20,000
    big = list(range(20000))
    big_rot = big[12345:] + big[:12345]
    t0 = time.perf_counter()
    idx = solver.search(big_rot, 500)
    t1 = time.perf_counter()
    assert big_rot[idx] == 500
    assert solver.search(big_rot, -999) == -1
    print(f"✓ Search in Rotated Sorted Array: fixed, 50 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'reverse-linked-list': `#!/usr/bin/env python3
import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def list_to_arr(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'reverse-linked-list.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'ListNode': ListNode, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]),
        ([1, 2], [2, 1]),
        ([], []),
        ([42], [42]),
        ([1, 1, 1], [1, 1, 1])
    ]
    for arr, exp in fixed:
        head = arr_to_list(arr)
        rev = solver.reverseList(head)
        assert list_to_arr(rev) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 40)
        arr = [rng.randint(-200, 200) for _ in range(sz)]
        head = arr_to_list(arr)
        rev = solver.reverseList(head)
        assert list_to_arr(rev) == list(reversed(arr))

    # Stress test: N = 10,000
    big = list(range(10000))
    head = arr_to_list(big)
    t0 = time.perf_counter()
    rev = solver.reverseList(head)
    t1 = time.perf_counter()
    assert list_to_arr(rev) == list(reversed(big))
    print(f"✓ Reverse Linked List: fixed, 50 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'merge-two-sorted-lists': `#!/usr/bin/env python3
import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def list_to_arr(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'merge-two-sorted-lists.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'ListNode': ListNode, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 4], [1, 3, 4], [1, 1, 2, 3, 4, 4]),
        ([], [], []),
        ([], [0], [0]),
        ([5], [1, 2, 3], [1, 2, 3, 5]),
        ([-3, -1], [-2, 0], [-3, -2, -1, 0])
    ]
    for a1, a2, exp in fixed:
        l1, l2 = arr_to_list(a1), arr_to_list(a2)
        res = solver.mergeTwoLists(l1, l2)
        assert list_to_arr(res) == exp

    rng = random.Random(42)
    for _ in range(50):
        n1 = rng.randint(0, 30); n2 = rng.randint(0, 30)
        a1 = sorted([rng.randint(-100, 100) for _ in range(n1)])
        a2 = sorted([rng.randint(-100, 100) for _ in range(n2)])
        exp = sorted(a1 + a2)
        l1, l2 = arr_to_list(a1), arr_to_list(a2)
        res = solver.mergeTwoLists(l1, l2)
        assert list_to_arr(res) == exp

    # Stress test: N1 = 5,000, N2 = 5,000
    a1 = list(range(0, 10000, 2))
    a2 = list(range(1, 10000, 2))
    l1, l2 = arr_to_list(a1), arr_to_list(a2)
    t0 = time.perf_counter()
    res = solver.mergeTwoLists(l1, l2)
    t1 = time.perf_counter()
    assert list_to_arr(res) == list(range(10000))
    print(f"✓ Merge Two Sorted Lists: fixed, 50 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'reorder-list': `#!/usr/bin/env python3
import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def list_to_arr(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

def ref_reorder(arr):
    if not arr: return []
    res = []
    i, j = 0, len(arr) - 1
    while i <= j:
        res.append(arr[i])
        if i != j:
            res.append(arr[j])
        i += 1
        j -= 1
    return res

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'reorder-list.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'ListNode': ListNode, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 4], [1, 4, 2, 3]),
        ([1, 2, 3, 4, 5], [1, 5, 2, 4, 3]),
        ([1], [1]),
        ([1, 2], [1, 2]),
        ([], [])
    ]
    for arr, exp in fixed:
        head = arr_to_list(arr)
        solver.reorderList(head)
        assert list_to_arr(head) == exp

    rng = random.Random(42)
    for _ in range(50):
        n = rng.randint(1, 35)
        arr = [rng.randint(-100, 100) for _ in range(n)]
        head = arr_to_list(arr)
        solver.reorderList(head)
        assert list_to_arr(head) == ref_reorder(arr)

    # Stress test: N = 5,000
    big = list(range(5000))
    head = arr_to_list(big)
    t0 = time.perf_counter()
    solver.reorderList(head)
    t1 = time.perf_counter()
    assert list_to_arr(head) == ref_reorder(big)
    print(f"✓ Reorder List: fixed, 50 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'remove-nth-node-from-end-of-list': `#!/usr/bin/env python3
import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def list_to_arr(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

def ref_remove_nth(arr, n):
    idx = len(arr) - n
    return arr[:idx] + arr[idx + 1:]

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'remove-nth-node-from-end-of-list.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'ListNode': ListNode, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 4, 5], 2, [1, 2, 3, 5]),
        ([1], 1, []),
        ([1, 2], 1, [1]),
        ([1, 2], 2, [2])
    ]
    for arr, n, exp in fixed:
        head = arr_to_list(arr)
        res = solver.removeNthFromEnd(head, n)
        assert list_to_arr(res) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 30)
        n = rng.randint(1, sz)
        arr = [rng.randint(-50, 50) for _ in range(sz)]
        head = arr_to_list(arr)
        res = solver.removeNthFromEnd(head, n)
        assert list_to_arr(res) == ref_remove_nth(arr, n)

    # Stress test: N = 5,000
    big = list(range(5000))
    head = arr_to_list(big)
    t0 = time.perf_counter()
    res = solver.removeNthFromEnd(head, 2500)
    t1 = time.perf_counter()
    assert list_to_arr(res) == ref_remove_nth(big, 2500)
    print(f"✓ Remove Nth Node From End of List: fixed, 50 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'linked-list-cycle': `#!/usr/bin/env python3
import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def create_linked_list_with_cycle(arr, pos):
    if not arr: return None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0]

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'linked-list-cycle.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'ListNode': ListNode, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 2, 0, -4], 1, True),
        ([1, 2], 0, True),
        ([1], -1, False),
        ([], -1, False),
        ([1, 2, 3, 4], -1, False),
        ([1, 2, 3, 4], 3, True)
    ]
    for arr, pos, exp in fixed:
        head = create_linked_list_with_cycle(arr, pos)
        assert solver.hasCycle(head) == exp

    rng = random.Random(42)
    for _ in range(50):
        n = rng.randint(1, 40)
        arr = [rng.randint(-100, 100) for _ in range(n)]
        has_c = rng.random() < 0.5
        pos = rng.randint(0, n - 1) if has_c else -1
        head = create_linked_list_with_cycle(arr, pos)
        assert solver.hasCycle(head) == has_c

    # Stress test: N = 10,000
    big = list(range(10000))
    head = create_linked_list_with_cycle(big, 5000)
    t0 = time.perf_counter()
    assert solver.hasCycle(head) is True
    t1 = time.perf_counter()

    head_no_cycle = create_linked_list_with_cycle(big, -1)
    assert solver.hasCycle(head_no_cycle) is False
    print(f"✓ Linked List Cycle: fixed, 50 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'lru-cache': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'lru-cache.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    LRUCache = scope['LRUCache']

    # Test 1: standard sequence from description
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    assert cache.get(1) == 1
    cache.put(3, 3) # evicts key 2
    assert cache.get(2) == -1
    cache.put(4, 4) # evicts key 1
    assert cache.get(1) == -1
    assert cache.get(3) == 3
    assert cache.get(4) == 4

    # Test 2: updating existing key does not evict incorrectly
    c2 = LRUCache(2)
    c2.put(2, 1)
    c2.put(2, 2)
    assert c2.get(2) == 2
    c2.put(1, 1)
    c2.put(4, 1) # evicts key 2 (key 2 was least recently used since put(1,1) came after get(2))
    assert c2.get(2) == -1

    # Test 3: stress / randomized
    rng = random.Random(42)
    cap = 50
    c3 = LRUCache(cap)
    model = {} # key -> val
    usage = [] # order of keys
    t0 = time.perf_counter()
    for _ in range(5000):
        if rng.random() < 0.6:
            k = rng.randint(1, 100)
            v = rng.randint(1, 1000)
            c3.put(k, v)
            model[k] = v
            if k in usage: usage.remove(k)
            usage.append(k)
            if len(usage) > cap:
                lru = usage.pop(0)
                del model[lru]
        else:
            k = rng.randint(1, 100)
            res = c3.get(k)
            if k in model:
                assert res == model[k]
                usage.remove(k)
                usage.append(k)
            else:
                assert res == -1
    t1 = time.perf_counter()

    print(f"✓ LRU Cache: standard, update, and 5,000 randomized operations passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`
};

export function writeBatch2Tests() {
  const testsDir = path.join(rootDir, 'dataset', 'tests');

  for (const [slug, code] of Object.entries(TESTS)) {
    const slugDir = path.join(testsDir, slug);
    fs.mkdirSync(slugDir, { recursive: true });
    const testPy = path.join(slugDir, 'test.py');
    fs.writeFileSync(testPy, code, 'utf8');
    fs.chmodSync(testPy, 0o755);
    console.log(`✓ Wrote dataset/tests/${slug}/test.py`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch2Tests();
}
