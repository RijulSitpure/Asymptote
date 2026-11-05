class Solution:
    def maxScore(self, nums: list[int]) -> int:
        stk = []
        for i, x in enumerate(nums):
            while stk and nums[stk[-1]] <= x:
                stk.pop()
            stk.append(i)
        
        ans = 0
        curr_idx = 0
        for j in stk:
            ans += (j - curr_idx) * nums[j]
            curr_idx = j
        return ans
