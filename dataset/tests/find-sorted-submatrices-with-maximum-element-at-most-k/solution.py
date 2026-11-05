class Solution:
    def countSubmatrices(self, grid: list[list[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        rows = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if grid[i][j] <= k:
                    if j > 0 and grid[i][j] <= grid[i][j - 1]:
                        rows[i][j] = rows[i][j - 1] + 1
                    else:
                        rows[i][j] = 1
                        
        ans = 0
        for j in range(n):
            stack = []
            curr_sum = 0
            for i in range(m):
                length = rows[i][j]
                cnt = 1
                while stack and stack[-1][0] >= length:
                    prev_l, prev_cnt = stack.pop()
                    curr_sum -= prev_l * prev_cnt
                    cnt += prev_cnt
                stack.append((length, cnt))
                curr_sum += length * cnt
                ans += curr_sum
                
        return ans
