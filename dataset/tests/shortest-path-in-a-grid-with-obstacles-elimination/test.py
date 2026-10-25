from collections import deque

class Solution:
    def shortestPath(self, grid: list[list[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        if k >= m + n - 2:
            return m + n - 2
        q = deque([(0, 0, k, 0)])
        seen = {(0, 0): k}
        while q:
            r, c, rem, steps = q.popleft()
            if r == m - 1 and c == n - 1:
                return steps
            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    nrem = rem - grid[nr][nc]
                    if nrem >= 0 and seen.get((nr, nc), -1) < nrem:
                        seen[(nr, nc)] = nrem
                        q.append((nr, nc, nrem, steps + 1))
        return -1

def test():
    sol = Solution()
    assert sol.shortestPath([[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], 1) == 6, "test 1 failed"
    assert sol.shortestPath([[0,1,1],[1,1,1],[1,0,0]], 1) == -1, "test 2 failed"
    print("✓ shortest-path-in-a-grid-with-obstacles-elimination passed")

if __name__ == "__main__":
    test()
