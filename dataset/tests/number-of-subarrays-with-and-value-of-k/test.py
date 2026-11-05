from solution import Solution

s = Solution()
assert s.countSubarrays([1, 1, 1], 1) == 6
assert s.countSubarrays([1, 1, 2], 1) == 3
assert s.countSubarrays([1, 2, 3], 2) == 2
print('All tests passed successfully.')