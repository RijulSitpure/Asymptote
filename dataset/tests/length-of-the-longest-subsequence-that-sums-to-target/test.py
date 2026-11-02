from solution import Solution
s = Solution()
assert s.lengthOfLongestSubsequence([1, 2, 3, 4, 5], 9) == 3
assert s.lengthOfLongestSubsequence([4, 1, 3, 2, 1, 5], 7) == 4
assert s.lengthOfLongestSubsequence([1, 1, 5, 4, 5], 3) == -1
print('length-of-the-longest-subsequence-that-sums-to-target passed')
