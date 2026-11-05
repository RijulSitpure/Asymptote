def canMakePalindromeQueries(n: int, edges: list[list[int]], s: str, queries: list[list[int]]) -> list[bool]:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    parent = [0] * n
    depth = [0] * n
    mask = [0] * n
    
    visited = [False] * n
    visited[0] = True
    mask[0] = 1 << (ord(s[0]) - ord('a'))
    
    q = [0]
    head = 0
    while head < len(q):
        u = q[head]
        head += 1
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                parent[v] = u
                depth[v] = depth[u] + 1
                mask[v] = mask[u] ^ (1 << (ord(s[v]) - ord('a')))
                q.append(v)
                
    def get_lca(u: int, v: int) -> int:
        while depth[u] > depth[v]:
            u = parent[u]
        while depth[v] > depth[u]:
            v = parent[v]
        while u != v:
            u = parent[u]
            v = parent[v]
        return u
        
    ans = []
    for u, v in queries:
        lca = get_lca(u, v)
        path_mask = mask[u] ^ mask[v] ^ (1 << (ord(s[lca]) - ord('a')))
        ans.append((path_mask & (path_mask - 1)) == 0)
    return ans