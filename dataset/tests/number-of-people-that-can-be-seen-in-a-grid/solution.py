class Solution:
    def seePeople(self, heights: list[list[int]]) -> list[list[int]]:
        m, n = len(heights), len(heights[0])
        ans = [[0] * n for _ in range(m)]
        
        for r in range(m):
            stk = []
            for c in range(n - 1, -1, -1):
                cnt = 0
                while stk and heights[r][c] > stk[-1]:
                    stk.pop()
                    cnt += 1
                if stk:
                    cnt += 1
                    if stk[-1] == heights[r][c]:
                        stk.pop()
                stk.append(heights[r][c])
                ans[r][c] += cnt
                
        for c in range(n):
            stk = []
            for r in range(m - 1, -1, -1):
                cnt = 0
                while stk and heights[r][c] > stk[-1]:
                    stk.pop()
                    cnt += 1
                if stk:
                    cnt += 1
                    if stk[-1] == heights[r][c]:
                        stk.pop()
                stk.append(heights[r][c])
                ans[r][c] += cnt
                
        return ans
