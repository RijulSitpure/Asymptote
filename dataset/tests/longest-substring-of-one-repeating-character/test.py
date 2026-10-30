from solution import Solution
s = Solution()
assert s.longestRepeating("babacc", "bcb", [1,3,3]) == [3,3,4]
assert s.longestRepeating("abyzz", "aa", [2,1]) == [2,3]
print("All tests passed for longest-substring-of-one-repeating-character!")
