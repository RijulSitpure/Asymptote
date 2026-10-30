from solution import Solution
s = Solution()
assert s.getCommon([1,2,3], [2,4]) == 2
assert s.getCommon([1,2,3,6], [2,3,4,5]) == 2
assert s.getCommon([1,3,5], [2,4,6]) == -1
print('All tests passed for minimum-common-value!')
