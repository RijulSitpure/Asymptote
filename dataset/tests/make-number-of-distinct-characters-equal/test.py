from solution import Solution
s = Solution()
assert s.isItPossible('ab', 'abcc') == False
assert s.isItPossible('a', 'bb') == False
assert s.isItPossible('abcc', 'aab') == True
print('All tests passed for make-number-of-distinct-characters-equal!')
