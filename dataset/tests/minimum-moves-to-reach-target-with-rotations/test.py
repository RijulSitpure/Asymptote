from collections import deque

class Solution:
    def minimumMoves(self, grid: list[list[int]]) -> int:
        n = len(grid)
        q = deque([(0, 0, 0, 0)])
        visited = {(0, 0, 0)}

        while q:
            r, c, o, d = q.popleft()
            if r == n - 1 and c == n - 2 and o == 0:
                return d

            if o == 0:
                if c + 2 < n and grid[r][c + 2] == 0 and (r, c + 1, 0) not in visited:
                    visited.add((r, c + 1, 0))
                    q.append((r, c + 1, 0, d + 1))
            else:
                if c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0 and (r, c + 1, 1) not in visited:
                    visited.add((r, c + 1, 1))
                    q.append((r, c + 1, 1, d + 1))

            if o == 0:
                if r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0 and (r + 1, c, 0) not in visited:
                    visited.add((r + 1, c, 0))
                    q.append((r + 1, c, 0, d + 1))
            else:
                if r + 2 < n and grid[r + 2][c] == 0 and (r + 1, c, 1) not in visited:
                    visited.add((r + 1, c, 1))
                    q.append((r + 1, c, 1, d + 1))

            if o == 0 and r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0:
                if (r, c, 1) not in visited:
                    visited.add((r, c, 1))
                    q.append((r, c, 1, d + 1))

            if o == 1 and c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0:
                if (r, c, 0) not in visited:
                    visited.add((r, c, 0))
                    q.append((r, c, 0, d + 1))

        return -1

sol = Solution()
g1 = [[0,0,0,0,0,1],
      [1,1,0,0,1,0],
      [0,0,0,0,1,1],
      [0,0,1,0,1,0],
      [0,1,1,0,0,0],
      [0,1,1,0,0,0]]
assert sol.minimumMoves(g1) == 11
print("All tests passed successfully.")
