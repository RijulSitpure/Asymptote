from solution import Solution

s = Solution()
assert s.numOfPairs(['777','7','77','77'], '7777') == 4
assert s.numOfPairs(['123','4','12','34'], '1234') == 2
assert s.numOfPairs(['1','1','1'], '11') == 6
print('OK')