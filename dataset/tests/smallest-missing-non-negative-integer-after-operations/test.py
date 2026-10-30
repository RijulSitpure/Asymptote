from solution import Solution
s = Solution()
assert s.findSmallestInteger([1, -10, 7, 13, 6, 8], 5) == 4
assert s.findSmallestInteger([1, -10, 7, 13, 6, 8], 7) == 2
print('All tests passed for smallest-missing-non-negative-integer-after-operations!')
