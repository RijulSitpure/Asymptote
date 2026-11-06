import heapq

def minActivationCost(edges: list[list[int]], values: list[int]) -> int:
    n = len(values)
    adj = [[] for _ in range(n)]
    for u, v, c in edges:
        adj[u].append((v, c))
        adj[v].append((u, c))

    start_par = values[0].bit_count() % 2
    dist = [[float('inf')] * 2 for _ in range(n)]
    dist[0][start_par] = 0
    pq = [(0, 0, start_par)]

    while pq:
        d, u, p = heapq.heappop(pq)
        if d > dist[u][p]:
            continue
        if u == n - 1 and p == 0:
            return d
        for v, c in adj[u]:
            np = (p ^ (values[v].bit_count() % 2))
            if d + c < dist[v][np]:
                dist[v][np] = d + c
                heapq.heappush(pq, (d + c, v, np))
    return dist[n - 1][0] if dist[n - 1][0] != float('inf') else -1
