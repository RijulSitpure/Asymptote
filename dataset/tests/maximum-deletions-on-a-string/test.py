from solution import Solution
s = Solution()
assert s.deleteString("abcabcdabc") == 2
assert s.deleteString("aaabaab") == 4
assert s.deleteString("aaaaa") == 5
print("All tests passed for maximum-deletions-on-a-string!")
