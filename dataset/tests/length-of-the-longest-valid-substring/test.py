from solution import Solution
s = Solution()
assert s.longestValidSubstring("cbaaaabc", ["aaa", "cb"]) == 4
assert s.longestValidSubstring("leetcode", ["de", "le", "e"]) == 4
print("All tests passed for length-of-the-longest-valid-substring")