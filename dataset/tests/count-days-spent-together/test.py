from solution import Solution
s = Solution()
assert s.countDaysTogether("08-15", "08-18", "08-16", "08-19") == 3
assert s.countDaysTogether("10-01", "10-31", "11-01", "12-31") == 0
print("All tests passed for count-days-spent-together!")
