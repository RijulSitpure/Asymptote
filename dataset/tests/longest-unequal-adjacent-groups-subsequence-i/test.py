from solution import Solution
s = Solution()
assert s.getLongestSubsequence(['e', 'a', 'b'], [0, 0, 1]) == ['e', 'b']
assert s.getLongestSubsequence(['a', 'b', 'c', 'd'], [1, 0, 1, 1]) == ['a', 'b', 'c']
print("longest-unequal-adjacent-groups-subsequence-i passed")
