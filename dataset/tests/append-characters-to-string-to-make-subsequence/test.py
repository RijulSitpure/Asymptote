from solution import Solution
s = Solution()
assert s.appendCharacters('coaching', 'coding') == 4
assert s.appendCharacters('abcde', 'a') == 0
assert s.appendCharacters('z', 'abcde') == 5
print('All tests passed for append-characters-to-string-to-make-subsequence!')
