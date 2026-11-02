from solution import Solution
s = Solution()
assert s.minimumRightShifts([3, 4, 5, 1, 2]) == 2
assert s.minimumRightShifts([1, 3, 5]) == 0
assert s.minimumRightShifts([2, 1, 4]) == -1
print("minimum-right-shifts-to-sort-the-array passed")
