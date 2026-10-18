#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'word-search.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_exist(board, word):
    R, C = len(board), len(board[0])
    visited = [[False] * C for _ in range(R)]

    def dfs(r, c, k):
        if k == len(word):
            return True
        if r < 0 or r >= R or c < 0 or c >= C:
            return False
        if visited[r][c] or board[r][c] != word[k]:
            return False
        visited[r][c] = True
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            if dfs(r + dr, c + dc, k + 1):
                visited[r][c] = False
                return True
        visited[r][c] = False
        return False

    for r in range(R):
        for c in range(C):
            if dfs(r, c, 0):
                return True
    return False

def clone_board(b):
    return [row[:] for row in b]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    base_board = [
        ["A","B","C","E"],
        ["S","F","C","S"],
        ["A","D","E","E"]
    ]

    fixed = [
        (base_board, "ABCCED", True),
        (base_board, "SEE", True),
        (base_board, "ABCB", False),
        ([["a"]], "a", True),
        ([["a"]], "b", False),
        ([["a","b"],["c","d"]], "abcd", False),
        ([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCESEEEFS", True)
    ]

    for b, word, exp in fixed:
        ans = solver.exist(clone_board(b), word)
        assert ans == exp, f"Failed on word={word}: expected {exp}, got {ans}"

    rng = random.Random(42)
    letters = "ABCDEF"
    for _ in range(25):
        R = rng.randint(2, 5)
        C = rng.randint(2, 5)
        b = [[rng.choice(letters) for _ in range(C)] for _ in range(R)]
        w_len = rng.randint(1, 6)
        w = ''.join(rng.choice(letters) for _ in range(w_len))
        exp = ref_exist(b, w)
        ans = solver.exist(clone_board(b), w)
        assert ans == exp, f"Failed on random board with word={w}"

    # Scale test: 6x6 board
    b6 = [["A"] * 6 for _ in range(6)]
    b6[5][5] = "B"
    t0 = time.perf_counter()
    ans = solver.exist(clone_board(b6), "AAAAAB")
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Word Search: fixed and 25 random cases passed. Scale (6x6 board): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
