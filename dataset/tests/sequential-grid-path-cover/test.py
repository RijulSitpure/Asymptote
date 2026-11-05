from typing import List

class Solution:
    def findPath(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        total = m * n
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        path = []

        def dfs(r: int, c: int, st: int, v: int) -> bool:
            path.append([r, c])
            if len(path) == total:
                return True
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    idx = nr * n + nc
                    if not (st & (1 << idx)):
                        val = grid[nr][nc]
                        if val == 0 or val == v:
                            nv = v + 1 if val == v else v
                            if dfs(nr, nc, st | (1 << idx), nv):
                                return True
            path.pop()
            return False

        for i in range(m):
            for j in range(n):
                if grid[i][j] in (0, 1):
                    start_v = 2 if grid[i][j] == 1 else 1
                    if dfs(i, j, 1 << (i * n + j), start_v):
                        return path
        return []

def run_tests():
    s = Solution()
    res = s.findPath([[1, 0], [0, 2]], 2)
    assert len(res) == 4, f"Expected 4 cells, got {len(res)}"
    print("3565 sequential-grid-path-cover PASSED")

if __name__ == "__main__":
    run_tests()
