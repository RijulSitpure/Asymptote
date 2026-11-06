def weightedSumOfTree(root_vals: list[int | None]) -> int:
    if not root_vals or root_vals[0] is None:
        return 0
    n = len(root_vals)
    total = 0
    
    def dfs(idx: int, depth: int) -> None:
        nonlocal total
        if idx >= n or root_vals[idx] is None:
            return
        total += root_vals[idx] * depth
        dfs(2 * idx + 1, depth + 1)
        dfs(2 * idx + 2, depth + 1)

    dfs(0, 1)
    return total