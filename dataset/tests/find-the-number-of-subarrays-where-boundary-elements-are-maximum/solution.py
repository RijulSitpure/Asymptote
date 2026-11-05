class Solution:
    def numberOfSubarrays(self, nums: list[int]) -> int:
        ans = 0
        stack = []
        for x in nums:
            while stack and stack[-1][0] < x:
                stack.pop()
            if stack and stack[-1][0] == x:
                stack[-1][1] += 1
                ans += stack[-1][1]
            else:
                stack.append([x, 1])
                ans += 1
        return ans
