from solution import Solution
s = Solution()
assert s.minimumIndex([1, 2, 2, 2]) == 2
assert s.minimumIndex([2, 1, 3, 1, 1, 1, 7, 1, 2, 1]) == 4
assert s.minimumIndex([3, 3, 3, 3, 7, 2, 2]) == -1
print("All tests passed for minimum-index-of-a-valid-split")