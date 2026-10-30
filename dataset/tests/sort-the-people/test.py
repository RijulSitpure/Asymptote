from solution import Solution
s = Solution()
assert s.sortPeople(["Mary","John","Emma"], [180,165,170]) == ["Mary","Emma","John"]
assert s.sortPeople(["Alice","Bob","Bob"], [155,185,150]) == ["Bob","Alice","Bob"]
print("All tests passed for sort-the-people!")
