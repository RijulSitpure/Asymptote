class Solution:
    def minimumTotalPrice(self, n: int, edges: list[list[int]], price: list[int], trips: list[list[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        count = [0] * n
        for start, end in trips:
            path = []
            def find_path(curr, parent):
                path.append(curr)
                if curr == end:
                    return True
                for nxt in adj[curr]:
                    if nxt != parent and find_path(nxt, curr):
                        return True
                path.pop()
                return False
            find_path(start, -1)
            for node in path:
                count[node] += 1
        def dfs(u, p):
            no_half = count[u] * price[u]
            half = count[u] * (price[u] // 2)
            for v in adj[u]:
                if v != p:
                    child_no_half, child_half = dfs(v, u)
                    no_half += min(child_no_half, child_half)
                    half += child_no_half
            return no_half, half
        r1, r2 = dfs(0, -1)
        return min(r1, r2)
