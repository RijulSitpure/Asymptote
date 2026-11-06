def lastVisitedCell(grid: list[str]) -> list[int]:
    m, n = len(grid), len(grid[0])
    dirs = {
        'R': (0, 1),
        'L': (0, -1),
        'D': (1, 0),
        'U': (-1, 0)
    }

    r, c = 0, 0
    visited = set()

    while True:
        visited.add((r, c))
        move = grid[r][c]
        dr, dc = dirs[move]
        nr, nc = r + dr, c + dc

        # Check if next step exits grid or enters a cycle
        if not (0 <= nr < m and 0 <= nc < n) or (nr, nc) in visited:
            return [r, c]

        r, c = nr, nc