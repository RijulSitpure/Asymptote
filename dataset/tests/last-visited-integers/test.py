from solution import Solution
s = Solution()
assert s.lastVisitedIntegers([1, 2, -1, -1, -1]) == [2, 1, -1]
assert s.lastVisitedIntegers([1, -1, 2, -1, -1]) == [1, 2, 1]
print("last-visited-integers passed")
