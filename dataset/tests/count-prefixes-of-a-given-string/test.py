from solution import Solution
s = Solution()
assert s.countPrefixes(["a","b","c","ab","bc","abc"], "abc") == 3
assert s.countPrefixes(["a","a"], "aa") == 2
print("All tests passed for count-prefixes-of-a-given-string!")
