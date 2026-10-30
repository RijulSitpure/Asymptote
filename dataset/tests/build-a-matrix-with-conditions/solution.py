from collections import defaultdict, deque

class Solution:
    def buildMatrix(self, k: int, rowConditions: list[list[int]], colConditions: list[list[int]]) -> list[list[int]]:
        def topo_sort(edges):
            adj = defaultdict(list)
            indeg = [0] * (k + 1)
            for u, v in edges:
                adj[u].append(v)
                indeg[v] += 1
            q = deque([i for i in range(1, k + 1) if indeg[i] == 0])
            order = []
            while q:
                node = q.popleft()
                order.append(node)
                for nxt in adj[node]:
                    indeg[nxt] -= 1
                    if indeg[nxt] == 0:
                        q.append(nxt)
            return order if len(order) == k else []
        
        row_order = topo_sort(rowConditions)
        col_order = topo_sort(colConditions)
        if not row_order or not col_order:
            return []
        
        row_pos = {val: i for i, val in enumerate(row_order)}
        col_pos = {val: j for j, val in enumerate(col_order)}
        res = [[0] * k for _ in range(k)]
        for num in range(1, k + 1):
            res[row_pos[num]][col_pos[num]] = num
        return res
