from solution import Solution
s = Solution()
assert s.takeCharacters('aabaaaacaabc', 2) == 8
assert s.takeCharacters('a', 1) == -1
print('All tests passed for take-k-of-each-character-from-left-and-right!')
