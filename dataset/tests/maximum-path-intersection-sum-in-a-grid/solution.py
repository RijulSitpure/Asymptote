def maxPathIntersectionSum(grid: list[list[int]]) -> int:
    m = len(grid)
    n = len(grid[0])
    ans = -float('inf')
    for r in range(m):
        if r == 0:
            ans = max(ans, sum(grid[0]))
        elif r == m - 1:
            ans = max(ans, sum(grid[m - 1]))
        else:
            cur = 0
            best_row = -float('inf')
            for val in grid[r]:
                cur = max(val, cur + val)
                best_row = max(best_row, cur)
            ans = max(ans, best_row)
    return ans