import heapq

def minCostToBuyApples(n: int, prices: list[int], roads: list[list[int]]) -> list[int]:
    g_empty = [[] for _ in range(n)]
    g_apples = [[] for _ in range(n)]
    for u, v, cost, tax in roads:
        g_empty[u].append((v, cost))
        g_empty[v].append((u, cost))
        g_apples[u].append((v, cost * tax))
        g_apples[v].append((u, cost * tax))

    def dijkstra(start: int, g: list) -> list[int]:
        dist = [float('inf')] * n
        dist[start] = 0
        pq = [(0, start)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
            for v, w in g[u]:
                if d + w < dist[v]:
                    dist[v] = d + w
                    heapq.heappush(pq, (d + w, v))
        return dist

    ans = [0] * n
    for i in range(n):
        d_emp = dijkstra(i, g_empty)
        d_app = dijkstra(i, g_apples)
        best = prices[i]
        for j in range(n):
            if d_emp[j] != float('inf') and d_app[j] != float('inf'):
                best = min(best, d_emp[j] + prices[j] + d_app[j])
        ans[i] = best
    return ans