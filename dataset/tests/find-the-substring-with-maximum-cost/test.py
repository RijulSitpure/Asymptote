from solution import Solution
s = Solution()
assert s.maximumCostSubstring('adaa', 'd', [-1000]) == 2
assert s.maximumCostSubstring('abc', 'abc', [-1, -1, -1]) == 0
print('All tests passed for find-the-substring-with-maximum-cost!')
