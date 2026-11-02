from solution import Solution
s = Solution()
assert s.maxSubarrayLength([7, 6, 5, 4, 3, 2, 1, 6, 10, 11]) == 8
assert s.maxSubarrayLength([57, 55, 50, 60, 61, 58, 63, 59, 64, 60, 63]) == 6
assert s.maxSubarrayLength([1, 2, 3, 4]) == 0
print("maximum-length-of-semi-decreasing-subarrays passed")
