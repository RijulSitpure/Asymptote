from solution import Solution
s = Solution()
assert s.smallestString("cbabc") == "baabc"
assert s.smallestString("aa") == "az"
assert s.smallestString("leetcode") == "kddsbncd"
print("All tests passed for lexicographically-smallest-string-after-substring-operation")
