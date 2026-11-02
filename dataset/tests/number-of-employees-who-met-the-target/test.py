from solution import Solution
s = Solution()
assert s.numberOfEmployeesWhoMetTarget([0, 1, 2, 3, 4], 2) == 3
assert s.numberOfEmployeesWhoMetTarget([5, 1, 4, 2, 2], 6) == 0
print("All tests passed for number-of-employees-who-met-the-target")