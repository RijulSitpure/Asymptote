class Solution:
    def subArrayRanges(self, nums: list[int]) -> int:
        n = len(nums)

        def sum_extrema(is_max: bool) -> int:
            total = 0
            stack = []
            for i in range(n + 1):
                while stack and (i == n or (nums[stack[-1]] < nums[i] if is_max else nums[stack[-1]] > nums[i])):
                    mid = stack.pop()
                    left = stack[-1] if stack else -1
                    right = i
                    count = (mid - left) * (right - mid)
                    total += nums[mid] * count
                stack.append(i)
            return total

        return sum_extrema(True) - sum_extrema(False)
