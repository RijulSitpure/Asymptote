class Solution:
    def minimumSum(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        
        def get_area(r1, c1, r2, c2):
            min_r, max_r = float('inf'), float('-inf')
            min_c, max_c = float('inf'), float('-inf')
            has_one = False
            for r in range(r1, r2 + 1):
                for c in range(c1, c2 + 1):
                    if grid[r][c] == 1:
                        has_one = True
                        min_r = min(min_r, r)
                        max_r = max(max_r, r)
                        min_c = min(min_c, c)
                        max_c = max(max_c, c)
            if not has_one:
                return 0
            return (max_r - min_r + 1) * (max_c - min_c + 1)
            
        ans = float('inf')
        for i in range(m - 2):
            for j in range(i + 1, m - 1):
                ans = min(ans, get_area(0, 0, i, n - 1) + get_area(i + 1, 0, j, n - 1) + get_area(j + 1, 0, m - 1, n - 1))
                
        for j in range(n - 2):
            for k in range(j + 1, n - 1):
                ans = min(ans, get_area(0, 0, m - 1, j) + get_area(0, j + 1, m - 1, k) + get_area(0, k + 1, m - 1, n - 1))
                
        for i in range(m - 1):
            for j in range(n - 1):
                ans = min(ans, get_area(0, 0, i, j) + get_area(0, j + 1, i, n - 1) + get_area(i + 1, 0, m - 1, n - 1))
                ans = min(ans, get_area(0, 0, i, n - 1) + get_area(i + 1, 0, m - 1, j) + get_area(i + 1, j + 1, m - 1, n - 1))
                
        for j in range(n - 1):
            for i in range(m - 1):
                ans = min(ans, get_area(0, 0, i, j) + get_area(i + 1, 0, m - 1, j) + get_area(0, j + 1, m - 1, n - 1))
                ans = min(ans, get_area(0, 0, m - 1, j) + get_area(0, j + 1, i, n - 1) + get_area(i + 1, j + 1, m - 1, n - 1))
                
        return ans