import sys
sys.setrecursionlimit(300_000)

class Solution:
    def minRunesToAdd(self, n: int, crystals: list[int], flowFrom: list[int], flowTo: list[int]) -> int:
        adj = [[] for _ in range(n)]
        rev_adj = [[] for _ in range(n)]
        for u, v in zip(flowFrom, flowTo):
            adj[u].append(v)
            rev_adj[v].append(u)
            
        visited = [False] * n
        order = []
        
        for i in range(n):
            if not visited[i]:
                st = [(i, 0)]
                visited[i] = True
                while st:
                    u, idx = st.pop()
                    if idx < len(adj[u]):
                        st.append((u, idx + 1))
                        v = adj[u][idx]
                        if not visited[v]:
                            visited[v] = True
                            st.append((v, 0))
                    else:
                        order.append(u)
                        
        comp_id = [-1] * n
        c_count = 0
        for u in reversed(order):
            if comp_id[u] == -1:
                st = [u]
                comp_id[u] = c_count
                while st:
                    curr = st.pop()
                    for v in rev_adj[curr]:
                        if comp_id[v] == -1:
                            comp_id[v] = c_count
                            st.append(v)
                c_count += 1
                
        dag_adj = [[] for _ in range(c_count)]
        in_degree = [0] * c_count
        for u, v in zip(flowFrom, flowTo):
            cu = comp_id[u]
            cv = comp_id[v]
            if cu != cv:
                dag_adj[cu].append(cv)
                in_degree[cv] += 1
                
        has_crystal = [False] * c_count
        for c in crystals:
            has_crystal[comp_id[c]] = True
            
        reachable_from_crystal = [False] * c_count
        st = [c for c in range(c_count) if has_crystal[c]]
        for c in st:
            reachable_from_crystal[c] = True
        while st:
            cu = st.pop()
            for cv in dag_adj[cu]:
                if not reachable_from_crystal[cv]:
                    reachable_from_crystal[cv] = True
                    st.append(cv)
                    
        ans = 0
        for c in range(c_count):
            if not reachable_from_crystal[c] and in_degree[c] == 0:
                ans += 1
        return ans
