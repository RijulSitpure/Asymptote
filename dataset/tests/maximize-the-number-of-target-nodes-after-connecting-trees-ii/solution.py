class Solution:
    def maxTargetNodes(self, edges1: list[list[int]], edges2: list[list[int]]) -> list[int]:
        n, m = len(edges1) + 1, len(edges2) + 1
        
        def get_parity(edges, size):
            adj = [[] for _ in range(size)]
            for u, v in edges:
                adj[u].append(v)
                adj[v].append(u)
            parity = [-1] * size
            parity[0] = 0
            st = [0]
            even_cnt = 1
            while st:
                u = st.pop()
                for v in adj[u]:
                    if parity[v] == -1:
                        parity[v] = parity[u] ^ 1
                        if parity[v] == 0:
                            even_cnt += 1
                        st.append(v)
            return parity, even_cnt
            
        par1, even1 = get_parity(edges1, n)
        par2, even2 = get_parity(edges2, m)
        
        odd1 = n - even1
        odd2 = m - even2
        max_t2 = max(even2, odd2)
        
        return [(even1 if par1[i] == 0 else odd1) + max_t2 for i in range(n)]
