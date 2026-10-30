class Solution:
    def totalSteps(self, nums: list[int]) -> int:
        stk = []
        ans = 0
        for x in reversed(nums):
            steps = 0
            while stk and x > stk[-1][0]:
                steps = max(steps + 1, stk[-1][1])
                stk.pop()
            stk.append((x, steps))
            ans = max(ans, steps)
        return ans
