class Solution:
    def containsCycle(self, grid: list[list[str]]) -> bool:
        import sys
        sys.setrecursionlimit(300000)
        R, C = len(grid), len(grid[0])
        visited = [[False] * C for _ in range(R)]
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        def dfs(r, c, pr, pc, ch):
            visited[r][c] = True
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == ch:
                    if nr == pr and nc == pc:
                        continue
                    if visited[nr][nc]:
                        return True
                    if dfs(nr, nc, r, c, ch):
                        return True
            return False
        for r in range(R):
            for c in range(C):
                if not visited[r][c]:
                    if dfs(r, c, -1, -1, grid[r][c]):
                        return True
        return False

def test():
    sol = Solution()
    assert sol.containsCycle([["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]) == True, "test 1 failed"
    assert sol.containsCycle([["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]) == True, "test 2 failed"
    assert sol.containsCycle([["a","b","b"],["b","z","b"],["b","b","a"]]) == False, "test 3 failed"
    print("✓ detect-cycles-in-2d-grid passed")

if __name__ == "__main__":
    test()
