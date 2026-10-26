import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    if not arr: return None
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'palindrome-linked-list.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'ListNode': ListNode, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 2, 1], True),
        ([1, 2], False),
        ([1], True),
        ([1, 2, 3, 2, 1], True),
        ([1, 2, 3, 4, 1], False)
    ]
    for arr, exp in fixed:
        res = solver.isPalindrome(arr_to_list(arr))
        assert res == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 35)
        is_pal = rng.random() < 0.5
        if is_pal:
            half = [rng.randint(0, 9) for _ in range(sz // 2)]
            mid = [rng.randint(0, 9)] if sz % 2 == 1 else []
            arr = half + mid + list(reversed(half))
            exp = True
        else:
            arr = [rng.randint(0, 9) for _ in range(sz)]
            exp = (arr == list(reversed(arr)))
        res = solver.isPalindrome(arr_to_list(arr))
        assert res == exp

    # Scale test: 40,000 nodes palindrome
    half = list(range(20000))
    big = half + list(reversed(half))
    t0 = time.perf_counter()
    res = solver.isPalindrome(arr_to_list(big))
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Palindrome Linked List: fixed, 35 random, and N=40k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
