class Solution:
    def countGoodNodes(self, edges: list[list[int]]) -> int:
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        good_count = 0
        def dfs(u, p):
            nonlocal good_count
            sub_sizes = []
            total_size = 1
            for v in adj[u]:
                if v == p:
                    continue
                sz = dfs(v, u)
                sub_sizes.append(sz)
                total_size += sz
            if len(set(sub_sizes)) <= 1:
                good_count += 1
            return total_size
            
        dfs(0, -1)
        return good_count
