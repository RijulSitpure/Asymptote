
class Solution:
    def lenOfVDiagonal(self, grid: list[list[int]]) -> int:
        n, m = len(grid), len(grid[0])
        dr = [1, 1, -1, -1]
        dc = [1, -1, -1, 1]
        memo = {}

        def dfs(r: int, c: int, d: int, turned: int, target: int) -> int:
            state = (r, c, d, turned, target)
            if state in memo:
                return memo[state]
            res = 0
            nr, nc = r + dr[d], c + dc[d]
            nxt = 0 if target == 2 else 2
            if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == target:
                res = max(res, 1 + dfs(nr, nc, d, turned, nxt))
            if not turned:
                nd = (d + 1) % 4
                tr, tc = r + dr[nd], c + dc[nd]
                if 0 <= tr < n and 0 <= tc < m and grid[tr][tc] == target:
                    res = max(res, 1 + dfs(tr, tc, nd, 1, nxt))
            memo[state] = res
            return res

        ans = 0
        has_one = False
        for r in range(n):
            for c in range(m):
                if grid[r][c] == 1:
                    has_one = True
                    for d in range(4):
                        ans = max(ans, 1 + dfs(r, c, d, 0, 2))
        return ans if has_one else 0

def test_length_of_longest_v_shaped_diagonal_segment():
    sol = Solution()
    g1 = [[2,2,1,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
    assert sol.lenOfVDiagonal(g1) == 5
    g2 = [[2,2,2,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
    assert sol.lenOfVDiagonal(g2) == 4
    g3 = [[1,2,2,2,2],[2,2,2,2,0],[2,0,0,0,0],[0,0,2,2,2],[2,0,0,2,0]]
    assert sol.lenOfVDiagonal(g3) == 5
    assert sol.lenOfVDiagonal([[1]]) == 1

if __name__ == '__main__':
    test_length_of_longest_v_shaped_diagonal_segment()
    print('All tests passed.')
