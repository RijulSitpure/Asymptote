from solution import Solution

s = Solution()
assert s.missingRolls([3,2,4,3], 4, 2) == [6,6]
assert s.missingRolls([1,5,6], 3, 4) == [3,2,2,2]
assert s.missingRolls([1,2,3,4], 6, 4) == []
print('OK')