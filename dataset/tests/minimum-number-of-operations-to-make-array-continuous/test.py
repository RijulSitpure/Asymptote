from solution import Solution

s = Solution()
assert s.minOperations([4,2,5,3]) == 0
assert s.minOperations([1,2,3,5,6]) == 1
assert s.minOperations([1,10,100,1000]) == 3
print('OK')