from solution import Solution

s = Solution()
assert s.minimumCost('abcdef', ['ab', 'cd', 'cde', 'ef'], [3, 2, 4, 1]) == 6
assert s.minimumCost('aaaa', ['z'], [1]) == -1
print('All tests passed successfully.')