import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'valid-sudoku.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_valid_sudoku(board):
    for r in range(9):
        row = [x for x in board[r] if x != '.']
        if len(row) != len(set(row)): return False
    for c in range(9):
        col = [board[r][c] for r in range(9) if board[r][c] != '.']
        if len(col) != len(set(col)): return False
    for br in range(3):
        for bc in range(3):
            box = []
            for r in range(br * 3, br * 3 + 3):
                for c in range(bc * 3, bc * 3 + 3):
                    if board[r][c] != '.':
                        box.append(board[r][c])
            if len(box) != len(set(box)): return False
    return True

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    b1 = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ]
    assert solver.isValidSudoku(b1) == True

    b2 = [
        ["8","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ]
    assert solver.isValidSudoku(b2) == False

    rng = random.Random(42)
    for _ in range(40):
        board = [['.' for _ in range(9)] for _ in range(9)]
        fill_count = rng.randint(5, 30)
        for _ in range(fill_count):
            r = rng.randint(0, 8)
            c = rng.randint(0, 8)
            board[r][c] = str(rng.randint(1, 9))
        assert solver.isValidSudoku(board) == ref_valid_sudoku(board)

    t0 = time.perf_counter()
    for _ in range(1000):
        solver.isValidSudoku(b1)
    t1 = time.perf_counter()
    print(f"✓ Valid Sudoku: fixed, 40 random, and 1000 boards verified in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
