from solution import Solution

s = Solution()
assert s.clearStars('aaba*') == 'aab'
assert s.clearStars('abc') == 'abc'
print('All tests passed successfully.')