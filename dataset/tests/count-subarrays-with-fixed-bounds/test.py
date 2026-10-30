from solution import Solution
s = Solution()
assert s.countSubarrays([1,3,5,2,7,5], 1, 5) == 2
assert s.countSubarrays([1,1,1,1], 1, 1) == 10
print("All tests passed for count-subarrays-with-fixed-bounds!")
