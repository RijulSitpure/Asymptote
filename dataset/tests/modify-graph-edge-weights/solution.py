class Solution:
    def modifiedGraphEdges(self, n: int, edges: list[list[int]], source: int, destination: int, target: int) -> list[list[int]]:
        import heapq
        def run_dijkstra():
            adj = [[] for _ in range(n)]
            for u, v, w in edges:
                if w != -1:
                    adj[u].append((v, w))
                    adj[v].append((u, w))
            dist = [float('inf')] * n
            dist[source] = 0
            pq = [(0, source)]
            while pq:
                d, u = heapq.heappop(pq)
                if d > dist[u]:
                    continue
                for v, w in adj[u]:
                    if dist[u] + w < dist[v]:
                        dist[v] = dist[u] + w
                        heapq.heappush(pq, (dist[v], v))
            return dist[destination]
        cur_dist = run_dijkstra()
        if cur_dist < target:
            return []
        matched = (cur_dist == target)
        for edge in edges:
            if edge[2] != -1:
                continue
            if matched:
                edge[2] = 2000000000
            else:
                edge[2] = 1
                cur_dist = run_dijkstra()
                if cur_dist <= target:
                    matched = True
                    edge[2] += target - cur_dist
        return edges if matched else []
