from solution import Solution

s = Solution()
assert s.prefixCount(["pay","attention","practice","attend"], "at") == 2
assert s.prefixCount(["leetcode","win","loops","success"], "code") == 0
print("All tests passed for counting-words-with-a-given-prefix!")
