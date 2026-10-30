from solution import Solution
s = Solution()
assert s.rearrangeCharacters("ilovecodingonleetcode", "code") == 2
assert s.rearrangeCharacters("abcba", "abc") == 1
assert s.rearrangeCharacters("abbaccaddaeea", "aaaaa") == 1
print("All tests passed for rearrange-characters-to-make-target-string!")
