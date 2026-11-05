from collections import deque

def multiSourceFloodFill(n: int, m: int, sources: list[list[int]]) -> list[list[int]]:
    grid = [[0] * m for _ in range(n)]
    dist = [[float('inf')] * m for _ in range(n)]
    cell_sources = {}
    for r, c, col in sources:
        if (r, c) not in cell_sources or col > cell_sources[(r, c)]:
            cell_sources[(r, c)] = col
    q = deque()
    for (r, c), col in cell_sources.items():
        grid[r][c] = col
        dist[r][c] = 0
        q.append((r, c))
    while q:
        level_size = len(q)
        next_colors = {}
        for _ in range(level_size):
            r, c = q.popleft()
            cur_col = grid[r][c]
            d = dist[r][c]
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < m:
                    if dist[nr][nc] > d + 1:
                        if (nr, nc) not in next_colors or cur_col > next_colors[(nr, nc)]:
                            next_colors[(nr, nc)] = cur_col
        for (nr, nc), col in next_colors.items():
            if dist[nr][nc] == float('inf'):
                dist[nr][nc] = d + 1
                grid[nr][nc] = col
                q.append((nr, nc))
    return grid