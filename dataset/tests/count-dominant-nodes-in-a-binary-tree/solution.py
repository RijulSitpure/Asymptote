def countDominantNodes(root_vals: list[int | None]) -> int:
    if not root_vals or root_vals[0] is None:
        return 0
    
    n = len(root_vals)
    ans = 0

    def dfs(idx: int) -> int:
        nonlocal ans
        if idx >= n or root_vals[idx] is None:
            return -10**15
        val = root_vals[idx]
        max_left = dfs(2 * idx + 1)
        max_right = dfs(2 * idx + 2)
        if val > max_left and val > max_right:
            ans += 1
        return max(val, max_left, max_right)

    dfs(0)
    return ans