from solution import Solution
s = Solution()
assert s.findPrefixScore([2, 3, 7, 5, 10]) == [4, 10, 24, 36, 56]
assert s.findPrefixScore([1, 1, 2, 4, 8, 16]) == [2, 4, 8, 16, 32, 64]
print('All tests passed for find-the-score-of-all-prefixes-of-an-array!')
