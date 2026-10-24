from typing import List

class Solution:
    def largestIsland(self, grid: List[List[int]]) -> int:
        n = len(grid)
        area = {}
        tag = 2

        def dfs(r: int, c: int, t: int) -> int:
            grid[r][c] = t
            cnt = 1
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                    cnt += dfs(nr, nc, t)
            return cnt

        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    area[tag] = dfs(r, c, tag)
                    tag += 1

        ans = max(area.values(), default=0)
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 0:
                    seen = set()
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:
                            seen.add(grid[nr][nc])
                    cand = 1 + sum(area[t] for t in seen)
                    if cand > ans:
                        ans = cand

        return ans

def test():
    sol = Solution()
    assert sol.largestIsland([[1, 0], [0, 1]]) == 3, "test 1 failed"
    assert sol.largestIsland([[1, 1], [1, 0]]) == 4, "test 2 failed"
    assert sol.largestIsland([[1, 1], [1, 1]]) == 4, "test 3 failed"
    print("✓ making-a-large-island passed")

if __name__ == "__main__":
    test()
