from solution import Solution
s = Solution()
assert s.findSubarrays([4,2,4]) == True
assert s.findSubarrays([1,2,3,4,5]) == False
assert s.findSubarrays([0,0,0]) == True
print("All tests passed for find-subarrays-with-equal-sum!")
