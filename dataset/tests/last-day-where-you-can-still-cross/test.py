from collections import deque

class Solution:
    def latestDayToCross(self, row: int, col: int, cells: list[list[int]]) -> int:
        def can_cross(day):
            grid = [[0] * col for _ in range(row)]
            for i in range(day):
                r, c = cells[i]
                grid[r - 1][c - 1] = 1
                
            q = deque()
            for c in range(col):
                if grid[0][c] == 0:
                    q.append((0, c))
                    grid[0][c] = 1
                    
            while q:
                r, c = q.popleft()
                if r == row - 1:
                    return True
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < row and 0 <= nc < col and grid[nr][nc] == 0:
                        grid[nr][nc] = 1
                        q.append((nr, nc))
            return False
            
        low = 1
        high = len(cells)
        ans = 1
        while low <= high:
            mid = (low + high) // 2
            if can_cross(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test_latest_day():
    sol = Solution()
    assert sol.latestDayToCross(2, 2, [[1,1],[2,1],[1,2],[2,2]]) == 2
    assert sol.latestDayToCross(2, 2, [[1,1],[1,2],[2,1],[2,2]]) == 1

