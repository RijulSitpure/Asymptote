from solution import Solution
s = Solution()
assert s.getWordsInLongestSubsequence(['bab', 'dab', 'cab'], [1, 2, 2]) == ['bab', 'dab']
assert s.getWordsInLongestSubsequence(['a', 'b', 'c', 'd'], [1, 2, 3, 4]) == ['a', 'b', 'c', 'd']
print("longest-unequal-adjacent-groups-subsequence-ii passed")
