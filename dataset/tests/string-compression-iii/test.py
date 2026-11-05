from solution import Solution

s = Solution()
assert s.compressedString('abcde') == '1a1b1c1d1e'
assert s.compressedString('aaaaaaaaaaaa') == '9a3a'
print('All tests passed successfully.')