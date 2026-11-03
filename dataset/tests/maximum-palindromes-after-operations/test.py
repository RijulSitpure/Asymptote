import sys
from solution import Solution
sol = Solution()

res = sol.maxPalindromesAfterOperations(words = ['abbb', 'ba', 'aa'])
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.maxPalindromesAfterOperations(words = ['abc', 'ab'])
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.maxPalindromesAfterOperations(words = ['cd', 'ef', 'a'])
assert res == 1, f"Expected { 1 }, got {res}"
print('All tests passed!')
