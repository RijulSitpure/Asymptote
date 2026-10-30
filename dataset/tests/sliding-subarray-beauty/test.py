from solution import Solution
s = Solution()
assert s.getSubarrayBeauty([1, -1, -3, -2, 3], 3, 2) == [-1, -2, -2]
assert s.getSubarrayBeauty([-1, -2, -3, -4, -5], 2, 2) == [-1, -2, -3, -4]
assert s.getSubarrayBeauty([-3, 1, 2, -3, 0, -3], 2, 1) == [-3, 0, -3, -3, -3]
print('All tests passed for sliding-subarray-beauty!')
