from solution import Solution
s = Solution()
assert s.validSubarraySplit([2,6,3,4,3]) == 2
assert s.validSubarraySplit([3,5]) == 2
assert s.validSubarraySplit([1,2,1]) == -1
print('All tests passed for minimum-subarrays-in-a-valid-split!')
