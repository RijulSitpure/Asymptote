from solution import Solution
s = Solution()
assert s.maxSum([2, 6, 7, 3, 1, 7], 3, 4) == 18
assert s.maxSum([5, 9, 9, 2, 4, 5, 4], 1, 3) == 23
assert s.maxSum([1, 2, 1, 2, 1, 2, 1], 3, 3) == 0
print("maximum-sum-of-almost-unique-subarray passed")
