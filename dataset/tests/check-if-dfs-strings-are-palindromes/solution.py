class Solution:
    def findAnswer(self, parent: list[int], s: str) -> list[bool]:
        n = len(parent)
        adj = [[] for _ in range(n)]
        for i in range(1, n):
            adj[parent[i]].append(i)
            
        # Children in increasing order
        for i in range(n):
            adj[i].sort()
            
        post_order = []
        L = [0] * n
        R = [0] * n
        
        # Post-order DFS traversal
        # We can implement iteratively or increase recursion depth
        import sys
        sys.setrecursionlimit(max(200000, n + 100))
        
        def dfs(u):
            l_idx = len(post_order)
            for v in adj[u]:
                dfs(v)
            post_order.append(s[u])
            r_idx = len(post_order) - 1
            L[u] = l_idx
            R[u] = r_idx
            
        dfs(0)
        
        # Manacher algorithm on post_order string
        chars = ['#']
        for ch in post_order:
            chars.append(ch)
            chars.append('#')
            
        m_len = len(chars)
        P = [0] * m_len
        c, r = 0, 0
        for i in range(m_len):
            i_mirror = 2 * c - i
            if i < r:
                P[i] = min(r - i, P[i_mirror])
            while i - P[i] - 1 >= 0 and i + P[i] + 1 < m_len and chars[i - P[i] - 1] == chars[i + P[i] + 1]:
                P[i] += 1
            if i + P[i] > r:
                c = i
                r = i + P[i]
                
        ans = [False] * n
        for i in range(n):
            l = L[i]
            r = R[i]
            # Center in Manacher string chars
            center = (l + r) + 1
            span = r - l + 1
            if P[center] >= span:
                ans[i] = True
                
        return ans
