from collections import deque

def minThresholdPath(n: int, edges: list[list[int]], source: int, target: int, k: int) -> int:
    g = [[] for _ in range(n)]
    weights = [0]
    for u, v, w in edges:
        g[u].append((v, w))
        g[v].append((u, w))
        weights.append(w)
    weights = sorted(set(weights))
    
    def can_reach(threshold: int) -> bool:
        dist = [float('inf')] * n
        dist[source] = 0
        q = deque([source])
        while q:
            u = q.popleft()
            if u == target:
                return dist[u] <= k
            d = dist[u]
            for v, w in g[u]:
                cost = 1 if w > threshold else 0
                if d + cost < dist[v] and d + cost <= k:
                    dist[v] = d + cost
                    if cost == 0:
                        q.appendleft(v)
                    else:
                        q.append(v)
        return dist[target] <= k

    if not can_reach(weights[-1]):
        return -1
    low = 0
    high = len(weights) - 1
    ans = weights[-1]
    while low <= high:
        mid = (low + high) // 2
        cand = weights[mid]
        if can_reach(cand):
            ans = cand
            high = mid - 1
        else:
            low = mid + 1
    return ans