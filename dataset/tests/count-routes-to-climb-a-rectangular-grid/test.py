class Solution:
    def countPaths(self, grid: list[list[int]]) -> int:
        MOD = 1_000_000_007
        m, n = len(grid), len(grid[0])
        memo = {}
        
        def dfs(r: int, c: int) -> int:
            if (r, c) in memo:
                return memo[(r, c)]
            res = 1
            for dr, dc in [(0, 1), (1, 0)]:
                nr, nc = r + dr, c + dc
                if nr < m and nc < n and grid[nr][nc] > grid[r][c]:
                    res = (res + dfs(nr, nc)) % MOD
            memo[(r, c)] = res
            return res
        
        total = 0
        for r in range(m):
            for c in range(n):
                total = (total + dfs(r, c)) % MOD
        return total

def run_tests():
    sol = Solution()
    # 2x2 grid: [[1, 2], [3, 4]]
    # Paths: 4 paths of length 1 (each single cell).
    # Length 2: (1,2), (1,3), (2,4), (3,4) -> 4 paths.
    # Length 3: (1,2,4), (1,3,4) -> 2 paths.
    # Total = 4 + 4 + 2 = 10.
    assert sol.countPaths([[1, 2], [3, 4]]) == 10
    assert sol.countPaths([[1]]) == 1
    print("All tests passed for 3797.")

if __name__ == "__main__":
    run_tests()
