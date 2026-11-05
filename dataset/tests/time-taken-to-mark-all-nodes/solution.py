class Solution:
    def timeTaken(self, edges: list[list[int]]) -> list[int]:
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        def get_w(node):
            return 2 if node % 2 == 0 else 1
            
        # dp[u] = [max1, node1, max2, node2]
        dp = [[0, -1, 0, -1] for _ in range(n)]
        
        def dfs1(u, p):
            for v in adj[u]:
                if v == p:
                    continue
                dfs1(v, u)
                cand = dp[v][0] + get_w(v)
                if cand > dp[u][0]:
                    dp[u][2], dp[u][3] = dp[u][0], dp[u][1]
                    dp[u][0], dp[u][1] = cand, v
                elif cand > dp[u][2]:
                    dp[u][2], dp[u][3] = cand, v
                    
        dfs1(0, -1)
        ans = [0] * n
        
        def dfs2(u, p, parent_cand):
            ans[u] = max(dp[u][0], parent_cand)
            for v in adj[u]:
                if v == p:
                    continue
                other = dp[u][2] if dp[u][1] == v else dp[u][0]
                up_val = max(parent_cand, other) + get_w(u)
                dfs2(v, u, up_val)
                
        dfs2(0, -1, 0)
        return ans
