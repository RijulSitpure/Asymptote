class Solution:
    def countSubIslands(self, grid1: list[list[int]], grid2: list[list[int]]) -> int:
        m, n = len(grid2), len(grid2[0])
        ans = 0

        def dfs(r: int, c: int) -> bool:
            is_sub = (grid1[r][c] == 1)
            grid2[r][c] = 0
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid2[nr][nc] == 1:
                    child_sub = dfs(nr, nc)
                    is_sub = is_sub and child_sub
            return is_sub

        for r in range(m):
            for c in range(n):
                if grid2[r][c] == 1:
                    if dfs(r, c):
                        ans += 1

        return ans

def test():
    sol = Solution()
    g1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]]
    g2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
    assert sol.countSubIslands(g1, g2) == 3

if __name__ == '__main__':
    test()
