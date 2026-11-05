from solution import Solution

s = Solution()
assert s.numberOfSubmatrices([['X', 'Y', '.'], ['Y', '.', '.']]) == 3
assert s.numberOfSubmatrices([['X', 'X'], ['X', 'Y']]) == 0
assert s.numberOfSubmatrices([['.', '.'], ['.', '.']]) == 0
print('All tests passed successfully.')