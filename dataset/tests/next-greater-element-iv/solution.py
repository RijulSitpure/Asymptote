class Solution:
    def secondGreaterElement(self, nums: list[int]) -> list[int]:
        n = len(nums)
        ans = [-1] * n
        s1 = []
        s2 = []
        for i, x in enumerate(nums):
            while s2 and nums[s2[-1]] < x:
                ans[s2.pop()] = x
            temp = []
            while s1 and nums[s1[-1]] < x:
                temp.append(s1.pop())
            while temp:
                s2.append(temp.pop())
            s1.append(i)
        return ans
