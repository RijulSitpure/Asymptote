from solution import Solution
s = Solution()
assert s.canMakeSubsequence("abc", "ad") == True
assert s.canMakeSubsequence("zc", "ad") == True
assert s.canMakeSubsequence("ab", "d") == False
print("make-string-a-subsequence-using-cyclic-increments passed")
