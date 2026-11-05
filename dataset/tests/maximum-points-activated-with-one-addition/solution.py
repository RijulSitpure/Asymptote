def maxPointsActivated(grid: list[list[int]]) -> int:
    n = len(grid)
    comp_size = {}
    comp_id = [[0] * n for _ in range(n)]
    cid = 1
    
    def dfs(r: int, c: int, cur_id: int) -> int:
        comp_id[r][c] = cur_id
        size = 1
        for nr, nc in [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)]:
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1 and comp_id[nr][nc] == 0:
                size += dfs(nr, nc, cur_id)
        return size

    max_comp = 0
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 1 and comp_id[r][c] == 0:
                sz = dfs(r, c, cid)
                comp_size[cid] = sz
                max_comp = max(max_comp, sz)
                cid += 1
                
    ans = max_comp
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 0:
                seen = set()
                cur = 1
                for nr, nc in [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)]:
                    if 0 <= nr < n and 0 <= nc < n and comp_id[nr][nc] > 0:
                        adj_id = comp_id[nr][nc]
                        if adj_id not in seen:
                            seen.add(adj_id)
                            cur += comp_size[adj_id]
                ans = max(ans, cur)
    return ans