class Solution:
    def minimumScore(self, nums: list[int], edges: list[list[int]]) -> int:
        from collections import defaultdict
        n = len(nums)
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        sub_xor = [0] * n
        tin = [0] * n
        tout = [0] * n
        timer = 0
        def dfs(u, p):
            nonlocal timer
            tin[u] = timer
            timer += 1
            sub_xor[u] = nums[u]
            for v in adj[u]:
                if v != p:
                    dfs(v, u)
                    sub_xor[u] ^= sub_xor[v]
            tout[u] = timer
        dfs(0, -1)
        def is_ancestor(u, v):
            return tin[u] <= tin[v] and tout[v] <= tout[u]
        total = sub_xor[0]
        ans = float('inf')
        m = len(edges)
        directed_edges = []
        for u, v in edges:
            directed_edges.append(v if is_ancestor(u, v) else u)
        for i in range(m):
            for j in range(i + 1, m):
                u, v = directed_edges[i], directed_edges[j]
                if is_ancestor(u, v):
                    c1 = sub_xor[v]
                    c2 = sub_xor[u] ^ sub_xor[v]
                    c3 = total ^ sub_xor[u]
                elif is_ancestor(v, u):
                    c1 = sub_xor[u]
                    c2 = sub_xor[v] ^ sub_xor[u]
                    c3 = total ^ sub_xor[v]
                else:
                    c1 = sub_xor[u]
                    c2 = sub_xor[v]
                    c3 = total ^ sub_xor[u] ^ sub_xor[v]
                ans = min(ans, max(c1, c2, c3) - min(c1, c2, c3))
        return ans
