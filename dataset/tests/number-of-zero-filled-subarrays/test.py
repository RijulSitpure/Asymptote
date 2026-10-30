from solution import Solution
s = Solution()
assert s.zeroFilledSubarray([1,3,0,0,2,0,0,4]) == 6
assert s.zeroFilledSubarray([0,0,0,2,0,0]) == 9
assert s.zeroFilledSubarray([2,10,2019]) == 0
print("All tests passed for number-of-zero-filled-subarrays!")
