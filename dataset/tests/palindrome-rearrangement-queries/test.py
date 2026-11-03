import sys
from solution import Solution
sol = Solution()

res = sol.canMakePalindromeQueries(s = "abcabc", queries = [[1,1,3,5],[0,2,5,5]])
assert res == [True, True], f'Expected [True, True], got {res}'
res = sol.canMakePalindromeQueries(s = "abbcdecbba", queries = [[0,2,7,9]])
assert res == [False], f'Expected [False], got {res}'
res = sol.canMakePalindromeQueries(s = "acbcab", queries = [[1,2,4,5]])
assert res == [True], f'Expected [True], got {res}'
print('All tests passed!')
