def shiftGrid(grid: list[list[int]], row_shifts: list[int], col_shifts: list[int]) -> list[list[int]]:
    m, n = len(grid), len(grid[0])
    # Step 1: row shifts
    after_rows = [[0] * n for _ in range(m)]
    for r in range(m):
        sh = row_shifts[r] % n
        for c in range(n):
            after_rows[r][(c + sh) % n] = grid[r][c]

    # Step 2: col shifts
    final_grid = [[0] * n for _ in range(m)]
    for c in range(n):
        sh = col_shifts[c] % m
        for r in range(m):
            final_grid[(r + sh) % m][c] = after_rows[r][c]

    return final_grid