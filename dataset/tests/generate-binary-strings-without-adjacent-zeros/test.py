from solution import Solution

s = Solution()
assert sorted(s.validStrings(3)) == sorted(['010', '011', '101', '110', '111'])
assert sorted(s.validStrings(1)) == sorted(['0', '1'])
print('All tests passed successfully.')