from solution import Solution
s = Solution()
assert s.minimumString("abc", "bca", "aaa") == "aaabca"
assert s.minimumString("ab", "ba", "aba") == "aba"
print("All tests passed for shortest-string-that-contains-three-strings")