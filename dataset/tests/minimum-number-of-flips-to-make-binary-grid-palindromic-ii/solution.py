class Solution:
    def minFlips(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = 0
        
        # 1. 4-cell orbits
        for r in range(m // 2):
            for c in range(n // 2):
                ones = grid[r][c] + grid[m - 1 - r][c] + grid[r][n - 1 - c] + grid[m - 1 - r][n - 1 - c]
                ans += min(ones, 4 - ones)
                
        # 2. Middle row and middle column symmetric pairs
        diff = 0
        ones_pairs = 0
        
        if m % 2 == 1:
            mid_r = m // 2
            for c in range(n // 2):
                if grid[mid_r][c] != grid[mid_r][n - 1 - c]:
                    diff += 1
                elif grid[mid_r][c] == 1:
                    ones_pairs += 1
                    
        if n % 2 == 1:
            mid_c = n // 2
            for r in range(m // 2):
                if grid[r][mid_c] != grid[m - 1 - r][mid_c]:
                    diff += 1
                elif grid[r][mid_c] == 1:
                    ones_pairs += 1
                    
        ans += diff
        if ones_pairs % 2 == 1 and diff == 0:
            ans += 2
            
        # 3. Center cell if both m and n are odd
        if m % 2 == 1 and n % 2 == 1:
            if grid[m // 2][n // 2] == 1:
                ans += 1
                
        return ans
