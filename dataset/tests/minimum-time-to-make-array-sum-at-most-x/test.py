from solution import Solution
s = Solution()
assert s.minimumTime([1, 2, 3], [1, 2, 3], 4) == 3
assert s.minimumTime([1, 2, 3], [3, 3, 3], 4) == -1
print("minimum-time-to-make-array-sum-at-most-x passed")
