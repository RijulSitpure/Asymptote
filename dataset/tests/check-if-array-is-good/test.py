from solution import Solution
s = Solution()
assert s.isGood([2, 1, 3]) is False
assert s.isGood([1, 3, 3, 2]) is True
assert s.isGood([1, 1]) is True
assert s.isGood([3, 4, 4, 1, 2, 1]) is False
print("All tests passed for check-if-array-is-good")