from typing import List, Optional
class Solution:
    def maximumLengthOfRanges(self, nums: List[int]) -> List[int]:
        n = len(nums)
        left = [-1] * n
        right = [n] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] < nums[i]:
                stack.pop()
            if stack:
                left[i] = stack[-1]
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] < nums[i]:
                stack.pop()
            if stack:
                right[i] = stack[-1]
            stack.append(i)
        return [right[i] - left[i] - 1 for i in range(n)]
