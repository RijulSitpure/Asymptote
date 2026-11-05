def distinctGatePathsToLCA(n: int, edges: list[list[int]], gate1: int, gate2: int) -> int:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    parent = [-1] * n
    depth = [0] * n
    stack = [(0, -1, 0)]
    while stack:
        u, p, d = stack.pop()
        parent[u] = p
        depth[u] = d
        for v in adj[u]:
            if v != p:
                stack.append((v, u, d + 1))
    
    # LCA of gate1 and gate2
    u, v = gate1, gate2
    dist1 = 0
    dist2 = 0
    while depth[u] > depth[v]:
        u = parent[u]
        dist1 += 1
    while depth[v] > depth[u]:
        v = parent[v]
        dist2 += 1
    while u != v:
        u = parent[u]
        v = parent[v]
        dist1 += 1
        dist2 += 1
    return dist1 + dist2