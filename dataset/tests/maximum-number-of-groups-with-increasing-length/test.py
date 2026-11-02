from solution import Solution
s = Solution()
assert s.maxIncreasingGroups([1, 2, 5]) == 3
assert s.maxIncreasingGroups([2, 1, 2]) == 2
assert s.maxIncreasingGroups([1, 1]) == 1
print("All tests passed for maximum-number-of-groups-with-increasing-length")