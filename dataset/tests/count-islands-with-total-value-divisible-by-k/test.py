from typing import List

class Solution:
    def countIslands(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        visited = [[False] * n for _ in range(m)]
        
        def bfs(sr: int, sc: int) -> int:
            queue = [(sr, sc)]
            visited[sr][sc] = True
            total = 0
            while queue:
                r, c = queue.pop(0)
                total += grid[r][c]
                for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and grid[nr][nc] > 0:
                        visited[nr][nc] = True
                        queue.append((nr, nc))
            return total

        ans = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] > 0 and not visited[r][c]:
                    island_sum = bfs(r, c)
                    if island_sum % k == 0:
                        ans += 1
        return ans

def run_tests():
    s = Solution()
    res1 = s.countIslands([[1, 2, 0], [0, 3, 0], [0, 0, 5]], 3)
    # Island 1: cells (0,0),(0,1),(1,1) -> sum 1+2+3 = 6 (divisible by 3)
    # Island 2: cell (2,2) -> sum 5 (not divisible by 3)
    assert res1 == 1, f"Expected 1, got {res1}"
    res2 = s.countIslands([[4, 4], [4, 4]], 8)
    assert res2 == 1, f"Expected 1, got {res2}" # sum 16 % 8 == 0
    print("3619 count-islands-with-total-value-divisible-by-k PASSED")

if __name__ == "__main__":
    run_tests()
