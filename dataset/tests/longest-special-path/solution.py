class Solution:
    def longestSpecialPath(self, edges: list[list[int]], nums: list[int]) -> list[int]:
        import sys
        sys.setrecursionlimit(200000)
        n = len(nums)
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        
        pos = {}
        dist = [0]
        path = [0]
        max_len = 0
        min_nodes = 1
        
        def dfs(u, p, top_idx):
            nonlocal max_len, min_nodes
            val = nums[u]
            prev_depth = pos.get(val, -1)
            new_top = max(top_idx, prev_depth + 1)
            
            curr_len = dist[-1] - dist[new_top]
            curr_nodes = len(path) - new_top
            if curr_len > max_len:
                max_len = curr_len
                min_nodes = curr_nodes
            elif curr_len == max_len and curr_len > 0:
                min_nodes = min(min_nodes, curr_nodes)
            
            pos[val] = len(path) - 1
            for v, w in adj[u]:
                if v != p:
                    dist.append(dist[-1] + w)
                    path.append(v)
                    dfs(v, u, new_top)
                    path.pop()
                    dist.pop()
            if prev_depth != -1:
                pos[val] = prev_depth
            else:
                del pos[val]
        
        dfs(0, -1, 0)
        return [max_len, min_nodes]
