from collections import deque

def shortestPathWithConsecutiveLimit(grid: list[list[str]], k: int) -> int:
    m = len(grid)
    n = len(grid[0])
    # (r, c, streak)
    start_state = (0, 0, 1)
    q = deque([(0, 0, 1, 0)])
    vis = set([start_state])
    while q:
        r, c, streak, dist = q.popleft()
        if r == m - 1 and c == n - 1:
            return dist
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                if grid[nr][nc] == grid[r][c]:
                    n_streak = streak + 1
                else:
                    n_streak = 1
                if n_streak <= k:
                    nxt = (nr, nc, n_streak)
                    if nxt not in vis:
                        vis.add(nxt)
                        q.append((nr, nc, n_streak, dist + 1))
    return -1