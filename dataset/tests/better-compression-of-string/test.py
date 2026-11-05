from solution import Solution

s = Solution()
assert s.betterCompression('a3c9b2c1') == 'a3b2c10'
assert s.betterCompression('c2b3a1') == 'a1b3c2'
assert s.betterCompression('a2b4c1') == 'a2b4c1'
print('All tests passed successfully.')