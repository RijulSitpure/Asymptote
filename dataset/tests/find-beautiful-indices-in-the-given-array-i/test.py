import sys
from solution import Solution
sol = Solution()

res = sol.beautifulIndices(s = 'isawsquirrelnearmysquirrelhouseohmy', a = 'my', b = 'squirrel', k = 15)
assert res == [16, 33], f'Expected [16, 33], got {res}'
res = sol.beautifulIndices(s = 'abcd', a = 'a', b = 'a', k = 4)
assert res == [0], f'Expected [0], got {res}'
print('All tests passed!')
