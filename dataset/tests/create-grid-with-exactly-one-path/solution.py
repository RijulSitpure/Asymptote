def constructUniquePathGrid(m: int, n: int) -> list[list[int]]:
    grid = [[1] * n for _ in range(m)]
    # First row is free: (0, 0) -> (0, n-1)
    for c in range(n):
        grid[0][c] = 0
    # Last column is free: (0, n-1) -> (m-1, n-1)
    for r in range(m):
        grid[r][n - 1] = 0
    return grid