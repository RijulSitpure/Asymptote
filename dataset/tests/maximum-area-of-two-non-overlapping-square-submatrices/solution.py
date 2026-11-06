def maxTwoNonOverlappingSquaresArea(grid: list[list[int]]) -> int:
    m = len(grid)
    n = len(grid[0])
    dp = [[0] * n for _ in range(m)]
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1:
                if r == 0 or c == 0:
                    dp[r][c] = 1
                else:
                    dp[r][c] = min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]) + 1

    # Max square area ending at or before row r
    row_pref = [0] * m
    cur_mx = 0
    for r in range(m):
        for c in range(n):
            cur_mx = max(cur_mx, dp[r][c] ** 2)
        row_pref[r] = cur_mx

    # Max square area strictly after row r
    row_suff = [0] * m
    cur_mx = 0
    for r in range(m - 1, -1, -1):
        for c in range(n):
            # A square completely within [r, m-1] can end up to m-1 with size fitting within [r, m-1]
            sz = dp[r][c]
            # Clip size to not extend before r
            for cand_r in range(r, m):
                cand_sz = min(dp[cand_r][c], cand_r - r + 1)
                cur_mx = max(cur_mx, cand_sz ** 2)
        row_suff[r] = cur_mx

    best = 0
    for r in range(m - 1):
        best = max(best, row_pref[r] + row_suff[r + 1])
    return best