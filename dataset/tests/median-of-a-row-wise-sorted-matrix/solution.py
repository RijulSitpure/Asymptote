import bisect

class Solution:
    def matrixMedian(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        low = min(row[0] for row in grid)
        high = max(row[-1] for row in grid)
        needed = (m * n + 1) // 2
        
        while low < high:
            mid = (low + high) // 2
            cnt = sum(bisect.bisect_right(row, mid) for row in grid)
            if cnt < needed:
                low = mid + 1
            else:
                high = mid
        return low
