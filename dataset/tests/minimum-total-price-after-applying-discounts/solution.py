def minimumTotalPrice(n: int, edges: list[list[int]], price: list[int], trips: list[list[int]]) -> int:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    count = [0] * n
    for start, end in trips:
        path = []
        def find_path(u: int, p: int) -> bool:
            path.append(u)
            if u == end:
                return True
            for v in adj[u]:
                if v != p and find_path(v, u):
                    return True
            path.pop()
            return False
        find_path(start, -1)
        for node in path:
            count[node] += 1

    def dfs(u: int, p: int) -> tuple[int, int]:
        no_discount = price[u] * count[u]
        discount = (price[u] // 2) * count[u]
        for v in adj[u]:
            if v != p:
                c_no, c_disc = dfs(v, u)
                no_discount += min(c_no, c_disc)
                discount += c_no
        return no_discount, discount

    c_no, c_disc = dfs(0, -1)
    return min(c_no, c_disc)