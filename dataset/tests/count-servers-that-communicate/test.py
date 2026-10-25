class Solution:
    def countServers(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        row_cnt = [sum(grid[r]) for r in range(m)]
        col_cnt = [sum(grid[r][c] for r in range(m)) for c in range(n)]
        
        ans = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1 and (row_cnt[r] > 1 or col_cnt[c] > 1):
                    ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.countServers([[1,0],[0,1]]) == 0, "test 1 failed"
    assert sol.countServers([[1,0],[1,1]]) == 3, "test 2 failed"
    assert sol.countServers([[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]) == 4, "test 3 failed"
    print("✓ count-servers-that-communicate passed")

if __name__ == "__main__":
    test()
