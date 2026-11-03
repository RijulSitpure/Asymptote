import sys
from solution import Solution
sol = Solution()

res = sol.countPrefixSuffixPairs(words = ['a', 'aba', 'ababa', 'aa'])
assert res == 4, f"Expected { 4 }, got {res}"
res = sol.countPrefixSuffixPairs(words = ['pa', 'papa', 'ma', 'mama'])
assert res == 2, f"Expected { 2 }, got {res}"
res = sol.countPrefixSuffixPairs(words = ['abab', 'ab'])
assert res == 0, f"Expected { 0 }, got {res}"
print('All tests passed!')
