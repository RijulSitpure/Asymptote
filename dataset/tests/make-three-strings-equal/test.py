from solution import Solution
s = Solution()
assert s.findMinimumOperations('abc', 'abb', 'ab') == 2
assert s.findMinimumOperations('dac', 'bac', 'cac') == -1
print('make-three-strings-equal passed')
