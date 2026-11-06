import heapq

def minCostPathWithKTurns(grid: list[list[int]], k: int) -> int:
    m, n = len(grid), len(grid[0])
    # Directions: 0: Right, 1: Down, 2: Left, 3: Up
    dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    # dist[r][c][dir][turns]
    # priority queue entries: (cost, r, c, last_dir, turns)
    pq = []
    # Start at (0, 0)
    for d in range(4):
        pq.append((grid[0][0], 0, 0, d, 0))

    dist = {}

    while pq:
        cost, r, c, d, turns = heapq.heappop(pq)
        if r == m - 1 and c == n - 1:
            return cost

        state = (r, c, d, turns)
        if dist.get(state, float('inf')) <= cost:
            continue
        dist[state] = cost

        for next_d, (dr, dc) in enumerate(dirs):
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                nturns = turns + (1 if next_d != d else 0)
                if nturns <= k:
                    ncost = cost + grid[nr][nc]
                    next_state = (nr, nc, next_d, nturns)
                    if ncost < dist.get(next_state, float('inf')):
                        heapq.heappush(pq, (ncost, nr, nc, next_d, nturns))

    return -1