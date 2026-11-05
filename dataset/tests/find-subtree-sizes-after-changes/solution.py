class Solution:
    def findSubtreeSizes(self, parent: list[int], s: str) -> list[int]:
        n = len(parent)
        adj = [[] for _ in range(n)]
        for i in range(1, n):
            adj[parent[i]].append(i)
            
        new_parent = list(parent)
        last = {}
        
        def dfs_ancestor(u: int):
            ch = s[u]
            prev = last.get(ch, -1)
            if prev != -1 and u != 0:
                new_parent[u] = prev
            last[ch] = u
            for v in adj[u]:
                dfs_ancestor(v)
            if prev != -1:
                last[ch] = prev
            else:
                del last[ch]
                
        dfs_ancestor(0)
        
        new_adj = [[] for _ in range(n)]
        for i in range(1, n):
            new_adj[new_parent[i]].append(i)
            
        ans = [1] * n
        def dfs_size(u: int):
            for v in new_adj[u]:
                dfs_size(v)
                ans[u] += ans[v]
                
        dfs_size(0)
        return ans
