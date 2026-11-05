import heapq

def minTimeToReachTarget(n: int, edges: list[list[int]], max_power: int) -> int:
    adj = [[] for _ in range(n)]
    for u, v, time, power in edges:
        adj[u].append((v, time, power))
        adj[v].append((u, time, power))
    
    # (time, u, power_left)
    dist = {}
    dist[(0, max_power)] = 0
    pq = [(0, 0, max_power)]
    while pq:
        t, u, p = heapq.heappop(pq)
        if u == n - 1:
            return t
        if t > dist.get((u, p), float('inf')):
            continue
        for v, edge_time, edge_power in adj[u]:
            if p >= edge_power:
                np = p - edge_power
                nt = t + edge_time
                if nt < dist.get((v, np), float('inf')):
                    dist[(v, np)] = nt
                    heapq.heappush(pq, (nt, v, np))
    return -1