from solution import Solution
s = Solution()
assert s.subarrayLCM([3,6,2,7,1], 6) == 4
assert s.subarrayLCM([3], 2) == 0
print('All tests passed for number-of-subarrays-with-lcm-equal-to-k!')
