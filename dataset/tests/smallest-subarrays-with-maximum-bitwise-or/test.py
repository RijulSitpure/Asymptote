from solution import Solution
s = Solution()
assert s.smallestSubarrays([1,0,2,1,3]) == [3,3,2,2,1]
assert s.smallestSubarrays([1,2]) == [2,1]
print("All tests passed for smallest-subarrays-with-maximum-bitwise-or!")
