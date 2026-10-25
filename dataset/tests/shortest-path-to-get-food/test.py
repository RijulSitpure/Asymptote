from collections import deque

class Solution:
    def getFood(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '*':
                    q.append((r, c, 0))
                    grid[r][c] = 'X'
                    break
            if q:
                break

        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        while q:
            r, c, d = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    if grid[nr][nc] == '#':
                        return d + 1
                    elif grid[nr][nc] == 'O':
                        grid[nr][nc] = 'X'
                        q.append((nr, nc, d + 1))
        return -1

def test():
    sol = Solution()
    grid1 = [["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]]
    assert sol.getFood(grid1) == 3
    grid2 = [["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]]
    assert sol.getFood(grid2) == -1

    print("✓ shortest-path-to-get-food passed")

if __name__ == '__main__':
    test()
