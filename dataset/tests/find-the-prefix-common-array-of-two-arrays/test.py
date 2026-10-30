from solution import Solution
s = Solution()
assert s.findThePrefixCommonArray([1,3,2,4], [3,1,2,4]) == [0,2,3,4]
assert s.findThePrefixCommonArray([2,3,1], [3,1,2]) == [0,1,3]
print('All tests passed for find-the-prefix-common-array-of-two-arrays!')
