from solution import Solution

s = Solution()
assert s.getEncryptedString('dart', 3) == 'tdar'
assert s.getEncryptedString('aaa', 1) == 'aaa'
print('All tests passed successfully.')