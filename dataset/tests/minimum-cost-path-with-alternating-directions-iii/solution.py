from collections import deque

def minCostAlternatingPath(n: int, red_edges: list[list[int]], blue_edges: list[list[int]]) -> list[int]:
    red_adj = [[] for _ in range(n)]
    for u, v in red_edges:
        red_adj[u].append(v)
    blue_adj = [[] for _ in range(n)]
    for u, v in blue_edges:
        blue_adj[u].append(v)
    
    # dist[node][color]: 0 = red arrival, 1 = blue arrival
    dist = [[-1, -1] for _ in range(n)]
    dist[0][0] = 0
    dist[0][1] = 0
    # (u, color)
    q = deque([(0, 0), (0, 1)])
    while q:
        u, color = q.popleft()
        d = dist[u][color]
        if color == 0:
            # next must be blue (1)
            for v in blue_adj[u]:
                if dist[v][1] == -1:
                    dist[v][1] = d + 1
                    q.append((v, 1))
        else:
            # next must be red (0)
            for v in red_adj[u]:
                if dist[v][0] == -1:
                    dist[v][0] = d + 1
                    q.append((v, 0))
    res = []
    for i in range(n):
        d0, d1 = dist[i]
        if d0 == -1 and d1 == -1:
            res.append(-1)
        elif d0 == -1:
            res.append(d1)
        elif d1 == -1:
            res.append(d0)
        else:
            res.append(min(d0, d1))
    return res