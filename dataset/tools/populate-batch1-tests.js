import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

const TESTS = {
  'contains-duplicate': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'contains-duplicate.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_contains_duplicate(nums):
    return len(nums) != len(set(nums))

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 1], True),
        ([1, 2, 3, 4], False),
        ([1, 1, 1, 3, 3, 4, 3, 2, 4, 2], True),
        ([], False),
        ([1], False),
        ([-10**9, 10**9, -10**9], True),
        ([0, 10**9, -10**9], False)
    ]
    for nums, exp in fixed:
        assert solver.containsDuplicate(nums) == exp, f"Failed on fixed: {nums}"

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 100)
        nums = [rng.randint(-500, 500) for _ in range(sz)]
        exp = ref_contains_duplicate(nums)
        assert solver.containsDuplicate(nums) == exp

    # Max-size test: N = 100,000
    big = list(range(100000))
    t0 = time.perf_counter()
    res = solver.containsDuplicate(big)
    t1 = time.perf_counter()
    assert res is False
    print(f"✓ Contains Duplicate: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'valid-anagram': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'valid-anagram.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_is_anagram(s, t):
    return sorted(s) == sorted(t)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("anagram", "nagaram", True),
        ("rat", "car", False),
        ("a", "a", True),
        ("a", "b", False),
        ("", "", True),
        ("ab", "a", False),
        ("nl", "cx", False)
    ]
    for s, t, exp in fixed:
        assert solver.isAnagram(s, t) == exp, f"Failed on fixed {s}, {t}"

    rng = random.Random(42)
    letters = 'abcdefghijklmnopqrstuvwxyz'
    for _ in range(60):
        sz = rng.randint(1, 50)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        if rng.random() < 0.5:
            lst = list(s)
            rng.shuffle(lst)
            t = ''.join(lst)
        else:
            t = ''.join(rng.choice(letters) for _ in range(rng.randint(sz - 1, sz + 1)))
        assert solver.isAnagram(s, t) == ref_is_anagram(s, t)

    # Max-size test: N = 50,000
    big_s = "a" * 25000 + "b" * 25000
    big_t = "b" * 25000 + "a" * 25000
    t0 = time.perf_counter()
    res = solver.isAnagram(big_s, big_t)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Valid Anagram: fixed and 60 random cases passed. Max size N=50k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'group-anagrams': `#!/usr/bin/env python3
import json, os, re, random, time
from collections import defaultdict

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'group-anagrams.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        groups[''.join(sorted(s))].append(s)
    return list(groups.values())

def normalize(groups):
    return sorted([sorted(g) for g in groups])

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ["eat", "tea", "tan", "ate", "nat", "bat"],
        [""],
        ["a"],
        ["bdddddddddd", "bbbbbbbbbbc"],
        ["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"]
    ]
    for strs in fixed:
        assert normalize(solver.groupAnagrams(strs)) == normalize(ref_group_anagrams(strs))

    rng = random.Random(42)
    letters = 'abcd'
    for _ in range(40):
        n = rng.randint(1, 20)
        strs = [''.join(rng.choice(letters) for _ in range(rng.randint(0, 6))) for _ in range(n)]
        assert normalize(solver.groupAnagrams(strs)) == normalize(ref_group_anagrams(strs))

    # Max-size test: 10,000 strings
    big_strs = ["abc" if i % 2 == 0 else "bca" for i in range(10000)]
    t0 = time.perf_counter()
    res = solver.groupAnagrams(big_strs)
    t1 = time.perf_counter()
    assert len(res) == 1 and len(res[0]) == 10000
    print(f"✓ Group Anagrams: fixed and 40 random cases passed. Max size N=10k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'top-k-frequent-elements': `#!/usr/bin/env python3
import json, os, re, random, time
from collections import Counter

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'top-k-frequent-elements.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_top_k(nums, k):
    return [item[0] for item in Counter(nums).most_common(k)]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 1, 1, 2, 2, 3], 2),
        ([1], 1),
        ([4, 1, -1, 2, -1, 2, 3], 2),
        ([1, 2], 2)
    ]
    for nums, k in fixed:
        ans = solver.topKFrequent(nums, k)
        ref = ref_top_k(nums, k)
        assert set(ans) == set(ref) and len(ans) == k

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(10, 100)
        nums = [rng.randint(-50, 50) for _ in range(sz)]
        uniq = len(set(nums))
        k = rng.randint(1, uniq)
        ans = solver.topKFrequent(nums, k)
        counts = Counter(nums)
        # All elements in ans must have frequency >= any element not in ans
        ans_min_freq = min(counts[x] for x in ans)
        rest = [counts[x] for x in counts if x not in ans]
        rest_max_freq = max(rest) if rest else -1
        assert len(ans) == k and ans_min_freq >= rest_max_freq

    # Max-size test: N = 100,000, k = 10
    big_nums = [i % 500 for i in range(100000)]
    t0 = time.perf_counter()
    ans = solver.topKFrequent(big_nums, 10)
    t1 = time.perf_counter()
    assert len(ans) == 10
    print(f"✓ Top K Frequent Elements: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'product-of-array-except-self': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'product-of-array-except-self.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_product_except_self(nums):
    n = len(nums)
    res = [1] * n
    for i in range(n):
        p = 1
        for j in range(n):
            if i != j:
                p *= nums[j]
        res[i] = p
    return res

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [1, 2, 3, 4],
        [-1, 1, 0, -3, 3],
        [0, 0],
        [1, 0],
        [2, 3]
    ]
    for nums in fixed:
        assert solver.productExceptSelf(nums) == ref_product_except_self(nums)

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(2, 20)
        nums = [rng.randint(-10, 10) for _ in range(sz)]
        assert solver.productExceptSelf(nums) == ref_product_except_self(nums)

    # Max-size test: N = 100,000
    big_nums = [1] * 100000
    big_nums[5000] = 2
    t0 = time.perf_counter()
    ans = solver.productExceptSelf(big_nums)
    t1 = time.perf_counter()
    assert ans[0] == 2 and ans[5000] == 1
    print(f"✓ Product of Array Except Self: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'longest-consecutive-sequence': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'longest-consecutive-sequence.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_longest_consecutive(nums):
    if not nums: return 0
    s = sorted(set(nums))
    longest = 1
    curr = 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1] + 1:
            curr += 1
            longest = max(longest, curr)
        else:
            curr = 1
    return longest

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [100, 4, 200, 1, 3, 2],
        [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
        [],
        [1],
        [1, 2, 0, 1],
        [-1, -2, -3, 0]
    ]
    for nums in fixed:
        assert solver.longestConsecutive(nums) == ref_longest_consecutive(nums)

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 100)
        nums = [rng.randint(-50, 50) for _ in range(sz)]
        assert solver.longestConsecutive(nums) == ref_longest_consecutive(nums)

    # Max-size test: N = 100,000
    big = list(range(100000))
    rng.shuffle(big)
    t0 = time.perf_counter()
    ans = solver.longestConsecutive(big)
    t1 = time.perf_counter()
    assert ans == 100000
    print(f"✓ Longest Consecutive Sequence: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'valid-palindrome': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'valid-palindrome.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_is_palindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        "A man, a plan, a canal: Panama",
        "race a car",
        " ",
        ".,",
        "0P",
        "a."
    ]
    for s in fixed:
        assert solver.isPalindrome(s) == ref_is_palindrome(s), f"Failed on fixed: '{s}'"

    rng = random.Random(42)
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ,.!?'
    for _ in range(50):
        sz = rng.randint(0, 100)
        s = ''.join(rng.choice(chars) for _ in range(sz))
        assert solver.isPalindrome(s) == ref_is_palindrome(s)

    # Max-size test: N = 200,000
    big_s = "a" * 100000 + "b" * 100000
    t0 = time.perf_counter()
    ans = solver.isPalindrome(big_s)
    t1 = time.perf_counter()
    assert ans is False
    print(f"✓ Valid Palindrome: fixed and 50 random cases passed. Max size N=200k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'two-sum-ii-input-array-is-sorted': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'two-sum-ii-input-array-is-sorted.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_two_sum(numbers, target):
    n = len(numbers)
    for i in range(n):
        for j in range(i + 1, n):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]
    return []

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 7, 11, 15], 9, [1, 2]),
        ([2, 3, 4], 6, [1, 3]),
        ([-1, 0], -1, [1, 2]),
        ([0, 0, 3, 4], 0, [1, 2]),
        ([-5, -3, 0, 2, 4, 6, 8], 5, [2, 7])
    ]
    for nums, target, exp in fixed:
        ans = solver.twoSum(nums, target)
        assert ans == exp or (nums[ans[0]-1] + nums[ans[1]-1] == target and ans[0] < ans[1])

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(2, 50)
        nums = sorted([rng.randint(-200, 200) for _ in range(sz)])
        i1, i2 = rng.sample(range(sz), 2)
        if i1 > i2: i1, i2 = i2, i1
        target = nums[i1] + nums[i2]
        ans = solver.twoSum(nums, target)
        assert len(ans) == 2 and ans[0] < ans[1]
        assert nums[ans[0]-1] + nums[ans[1]-1] == target

    # Max-size test: N = 30,000
    big_nums = list(range(-15000, 15000))
    t0 = time.perf_counter()
    ans = solver.twoSum(big_nums, 20000)
    t1 = time.perf_counter()
    assert big_nums[ans[0]-1] + big_nums[ans[1]-1] == 20000
    print(f"✓ Two Sum II: fixed and 50 random cases passed. Max size N=30k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  '3sum': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', '3sum.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_three_sum(nums):
    n = len(nums)
    seen = set()
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    seen.add(tuple(sorted([nums[i], nums[j], nums[k]])))
    return sorted(list(seen))

def normalize(triplets):
    return sorted([sorted(t) for t in triplets])

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [-1, 0, 1, 2, -1, -4],
        [0, 1, 1],
        [0, 0, 0],
        [-2, 0, 1, 1, 2],
        [-1, -1, 2, 2]
    ]
    for nums in fixed:
        assert normalize(solver.threeSum(nums)) == normalize(ref_three_sum(nums))

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(3, 20)
        nums = [rng.randint(-15, 15) for _ in range(sz)]
        assert normalize(solver.threeSum(nums)) == normalize(ref_three_sum(nums))

    # Max-size test: N = 1000
    big_nums = [rng.randint(-100, 100) for _ in range(1000)]
    t0 = time.perf_counter()
    ans = solver.threeSum(big_nums)
    t1 = time.perf_counter()
    for t in ans:
        assert sum(t) == 0
    print(f"✓ 3Sum: fixed and 30 random cases passed. Max size N=1k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'container-with-most-water': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'container-with-most-water.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_max_area(height):
    max_w = 0
    n = len(height)
    for i in range(n):
        for j in range(i + 1, n):
            max_w = max(max_w, (j - i) * min(height[i], height[j]))
    return max_w

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 8, 6, 2, 5, 4, 8, 3, 7], 49),
        ([1, 1], 1),
        ([4, 3, 2, 1, 4], 16),
        ([1, 2, 1], 2),
        ([2, 3, 4, 5, 18, 17, 6], 17)
    ]
    for h, exp in fixed:
        assert solver.maxArea(h) == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(2, 40)
        h = [rng.randint(1, 100) for _ in range(sz)]
        assert solver.maxArea(h) == ref_max_area(h)

    # Max-size test: N = 100,000
    big_h = [i for i in range(100000)]
    t0 = time.perf_counter()
    ans = solver.maxArea(big_h)
    t1 = time.perf_counter()
    assert ans > 0
    print(f"✓ Container With Most Water: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'trapping-rain-water': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'trapping-rain-water.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_trap(height):
    if not height: return 0
    n = len(height)
    l_max = [0] * n
    r_max = [0] * n
    l_max[0] = height[0]
    for i in range(1, n): l_max[i] = max(l_max[i - 1], height[i])
    r_max[n - 1] = height[n - 1]
    for i in range(n - 2, -1, -1): r_max[i] = max(r_max[i + 1], height[i])
    water = 0
    for i in range(n):
        water += max(0, min(l_max[i], r_max[i]) - height[i])
    return water

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6),
        ([4, 2, 0, 3, 2, 5], 9),
        ([], 0),
        ([1], 0),
        ([2, 0, 2], 2),
        ([5, 4, 3, 2, 1], 0),
        ([1, 2, 3, 4, 5], 0)
    ]
    for h, exp in fixed:
        assert solver.trap(h) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 50)
        h = [rng.randint(0, 30) for _ in range(sz)]
        assert solver.trap(h) == ref_trap(h)

    # Max-size test: N = 20,000
    big_h = [rng.randint(0, 1000) for _ in range(20000)]
    t0 = time.perf_counter()
    ans = solver.trap(big_h)
    t1 = time.perf_counter()
    assert ans == ref_trap(big_h)
    print(f"✓ Trapping Rain Water: fixed and 50 random cases passed. Max size N=20k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'best-time-to-buy-and-sell-stock': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'best-time-to-buy-and-sell-stock.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_max_profit(prices):
    max_p = 0
    n = len(prices)
    for i in range(n):
        for j in range(i + 1, n):
            max_p = max(max_p, prices[j] - prices[i])
    return max_p

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([7, 1, 5, 3, 6, 4], 5),
        ([7, 6, 4, 3, 1], 0),
        ([1, 2], 1),
        ([2, 1], 0),
        ([3, 3, 3], 0),
        ([], 0),
        ([5], 0)
    ]
    for p, exp in fixed:
        assert solver.maxProfit(p) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 50)
        p = [rng.randint(1, 200) for _ in range(sz)]
        assert solver.maxProfit(p) == ref_max_profit(p)

    # Max-size test: N = 100,000
    big_p = list(range(100000, 0, -1))
    big_p[50000] = 1
    t0 = time.perf_counter()
    ans = solver.maxProfit(big_p)
    t1 = time.perf_counter()
    assert ans == 49998
    print(f"✓ Best Time to Buy and Sell Stock: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'longest-substring-without-repeating-characters': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'longest-substring-without-repeating-characters.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_length_of_longest_substring(s):
    max_len = 0
    n = len(s)
    for i in range(n):
        seen = set()
        for j in range(i, n):
            if s[j] in seen: break
            seen.add(s[j])
            max_len = max(max_len, j - i + 1)
    return max_len

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("abcabcbb", 3),
        ("bbbbb", 1),
        ("pwwkew", 3),
        ("", 0),
        (" ", 1),
        ("au", 2),
        ("dvdf", 3)
    ]
    for s, exp in fixed:
        assert solver.lengthOfLongestSubstring(s) == exp, f"Failed on fixed: {s}"

    rng = random.Random(42)
    letters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for _ in range(50):
        sz = rng.randint(0, 40)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        assert solver.lengthOfLongestSubstring(s) == ref_length_of_longest_substring(s)

    # Max-size test: N = 50,000
    big_s = "abcdefghijklmnopqrstuvwxyz" * 1923
    t0 = time.perf_counter()
    ans = solver.lengthOfLongestSubstring(big_s)
    t1 = time.perf_counter()
    assert ans == 26
    print(f"✓ Longest Substring Without Repeating: fixed and 50 random cases passed. Max size N=50k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'longest-repeating-character-replacement': `#!/usr/bin/env python3
import json, os, re, random, time
from collections import Counter

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'longest-repeating-character-replacement.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_character_replacement(s, k):
    max_len = 0
    n = len(s)
    for i in range(n):
        counts = Counter()
        for j in range(i, n):
            counts[s[j]] += 1
            max_f = max(counts.values())
            if (j - i + 1) - max_f <= k:
                max_len = max(max_len, j - i + 1)
    return max_len

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("ABAB", 2, 4),
        ("AABABBA", 1, 4),
        ("AAAA", 0, 4),
        ("ABCDE", 1, 2),
        ("ABBB", 2, 4)
    ]
    for s, k, exp in fixed:
        assert solver.characterReplacement(s, k) == exp

    rng = random.Random(42)
    letters = 'ABCDE'
    for _ in range(40):
        sz = rng.randint(1, 30)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        k = rng.randint(0, sz)
        assert solver.characterReplacement(s, k) == ref_character_replacement(s, k)

    # Max-size test: N = 100,000
    big_s = "A" * 50000 + "B" * 50000
    t0 = time.perf_counter()
    ans = solver.characterReplacement(big_s, 100)
    t1 = time.perf_counter()
    assert ans == 50100
    print(f"✓ Longest Repeating Character Replacement: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'minimum-window-substring': `#!/usr/bin/env python3
import json, os, re, random, time
from collections import Counter

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'minimum-window-substring.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_min_window(s, t):
    if not s or not t: return ""
    need = Counter(t)
    best = ""
    min_len = float('inf')
    n = len(s)
    for i in range(n):
        cur = Counter()
        for j in range(i, n):
            cur[s[j]] += 1
            if all(cur[c] >= need[c] for c in need):
                if (j - i + 1) < min_len:
                    min_len = j - i + 1
                    best = s[i:j+1]
                break
    return best

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("ADOBECODEBANC", "ABC", "BANC"),
        ("a", "a", "a"),
        ("a", "aa", ""),
        ("ab", "b", "b"),
        ("aa", "aa", "aa")
    ]
    for s, t, exp in fixed:
        ans = solver.minWindow(s, t)
        assert ans == exp, f"Failed on fixed {s}, {t}: expected '{exp}', got '{ans}'"

    rng = random.Random(42)
    letters = 'ABCDE'
    for _ in range(40):
        s_len = rng.randint(1, 25)
        t_len = rng.randint(1, 5)
        s = ''.join(rng.choice(letters) for _ in range(s_len))
        t = ''.join(rng.choice(letters) for _ in range(t_len))
        ans = solver.minWindow(s, t)
        ref = ref_min_window(s, t)
        assert len(ans) == len(ref)
        if ref:
            # check ans contains all characters in t
            cur = Counter(ans)
            for c, cnt in Counter(t).items():
                assert cur[c] >= cnt

    # Max-size test: |s| = 100,000, |t| = 3
    big_s = "A" * 50000 + "B" + "C" + "A" * 50000
    t0 = time.perf_counter()
    ans = solver.minWindow(big_s, "ABC")
    t1 = time.perf_counter()
    assert ans == "BCA" or ans == "ABC"
    print(f"✓ Minimum Window Substring: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`
};

export function writeTests() {
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
  writeTests();
}
