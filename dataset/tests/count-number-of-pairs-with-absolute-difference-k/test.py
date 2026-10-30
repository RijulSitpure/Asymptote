from solution import Solution

s = Solution()
assert s.countKDifference([1,2,2,1], 1) == 4
assert s.countKDifference([1,3], 3) == 0
assert s.countKDifference([3,2,1,5,4], 2) == 3
print('OK')