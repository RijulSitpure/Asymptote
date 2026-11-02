from solution import Solution
s = Solution()
assert s.maxNonDecreasingLength([2, 3, 1], [1, 2, 1]) == 2
assert s.maxNonDecreasingLength([1, 3, 2, 1], [2, 2, 3, 4]) == 4
assert s.maxNonDecreasingLength([1, 1], [2, 2]) == 2
print("All tests passed for longest-non-decreasing-subarray-from-two-arrays")