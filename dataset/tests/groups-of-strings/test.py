from solution import Solution

s = Solution()
assert s.groupStrings(["a","b","ab","cde"]) == [2, 3]
assert s.groupStrings(["a","ab","abc"]) == [1, 3]
print("All tests passed for groups-of-strings!")
