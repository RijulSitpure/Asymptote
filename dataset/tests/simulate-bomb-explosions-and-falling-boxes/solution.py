def simulateBombAndBoxes(grid: list[list[str]]) -> list[list[str]]:
    m, n = len(grid), len(grid[0])
    for _ in range(m + n + 10):
        new_grid = [row[:] for row in grid]
        exploding = []
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '*':
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '#':
                            exploding.append((r, c))
                            break
        for br, bc in exploding:
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    nr, nc = br + dr, bc + dc
                    if 0 <= nr < m and 0 <= nc < n and new_grid[nr][nc] == '#':
                        new_grid[nr][nc] = '-'
        grid = new_grid
        is_static = [[False] * n for _ in range(m)]
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '#':
                    if r == m - 1 or grid[r + 1][c] == '*':
                        is_static[r][c] = True
        changed = True
        while changed:
            changed = False
            for r in range(m - 2, -1, -1):
                for c in range(n):
                    if grid[r][c] == '#' and not is_static[r][c]:
                        if is_static[r + 1][c] and grid[r + 1][c] == '#':
                            is_static[r][c] = True
                            changed = True
        next_grid = [row[:] for row in grid]
        moved = False
        for r in range(m - 2, -1, -1):
            for c in range(n):
                if grid[r][c] == '#' and not is_static[r][c] and grid[r + 1][c] == '-':
                    next_grid[r][c] = '-'
                    next_grid[r + 1][c] = '#'
                    moved = True
        grid = next_grid
        if not exploding and not moved:
            break
    return grid
