def subtreeInversionSum(edges: list[list[int]], nums: list[int], k: int) -> int:
    n = len(nums)
    g = [[] for _ in range(n)]
    for u, v in edges:
        g[u].append(v)
        g[v].append(u)
    base_sum = sum(nums)
    tree_adj = [[] for _ in range(n)]
    visited = [False] * n
    visited[0] = True
    q = [0]
    while q:
        curr = q.pop(0)
        for nxt in g[curr]:
            if not visited[nxt]:
                visited[nxt] = True
                tree_adj[curr].append(nxt)
                q.append(nxt)

    def get_subtree(u: int):
        nodes = [u]
        for v in tree_adj[u]:
            nodes.extend(get_subtree(v))
        return nodes

    ans = base_sum
    for u in range(n):
        sub_nodes = get_subtree(u)
        delta = -2 * sum(nums[x] for x in sub_nodes)
        ans = max(ans, base_sum + delta)
    return ans