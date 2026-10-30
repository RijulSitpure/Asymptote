from collections import deque

class Solution:
    def nearestExit(self, maze: list[list[str]], entrance: list[int]) -> int:
        m, n = len(maze), len(maze[0])
        er, ec = entrance
        q = deque([(er, ec, 0)])
        maze[er][ec] = "+"
        
        while q:
            r, c, d = q.popleft()
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and maze[nr][nc] == ".":
                    if nr == 0 or nr == m - 1 or nc == 0 or nc == n - 1:
                        return d + 1
                    maze[nr][nc] = "+"
                    q.append((nr, nc, d + 1))
        return -1

def test_nearest_exit():
    sol = Solution()
    assert sol.nearestExit([["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], [1, 2]) == 1
    assert sol.nearestExit([["+","+","+"],[".",".","."],["+","+","+"]], [1, 0]) == 2
    assert sol.nearestExit([[".","+"]], [0, 0]) == -1

