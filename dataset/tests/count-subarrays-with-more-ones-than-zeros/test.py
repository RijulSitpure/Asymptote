from solution import Solution

s = Solution()
assert s.subarraysWithMoreZerosThanOnes([0,1,1,0,1]) == 9
assert s.subarraysWithMoreZerosThanOnes([0]) == 0
assert s.subarraysWithMoreZerosThanOnes([1]) == 1
print('OK')