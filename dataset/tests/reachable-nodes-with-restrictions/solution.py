from collections import defaultdict, deque

class Solution:
    def reachableNodes(self, n: int, edges: list[list[int]], restricted: list[int]) -> int:
        bad = set(restricted)
        adj = defaultdict(list)
        for u, v in edges:
            if u not in bad and v not in bad:
                adj[u].append(v)
                adj[v].append(u)
        q = deque([0])
        visited = {0}
        while q:
            u = q.popleft()
            for v in adj[u]:
                if v not in visited:
                    visited.add(v)
                    q.append(v)
        return len(visited)
