def countConnectedSubgraphs(nums: list[int], edges: list[list[int]]) -> int:
    n = len(nums)
    g = [[] for _ in range(n)]
    for u, v in edges:
        g[u].append(v)
        g[v].append(u)
    ans = 0
    for sub in range(1, 1 << n):
        node_sum = 0
        start = -1
        for i in range(n):
            if (sub >> i) & 1:
                node_sum += nums[i]
                if start == -1:
                    start = i
        if node_sum % 2 != 0:
            continue
        visited_mask = 1 << start
        q = [start]
        while q:
            curr = q.pop(0)
            for nxt in g[curr]:
                if ((sub >> nxt) & 1) and not ((visited_mask >> nxt) & 1):
                    visited_mask |= (1 << nxt)
                    q.append(nxt)
        if visited_mask == sub:
            ans += 1
    return ans