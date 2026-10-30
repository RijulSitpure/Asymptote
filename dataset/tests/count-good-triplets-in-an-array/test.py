from solution import Solution

s = Solution()
assert s.goodTriplets([2,0,1,3], [0,1,2,3]) == 1
assert s.goodTriplets([4,0,1,3,2], [4,1,0,2,3]) == 4
print("All tests passed for count-good-triplets-in-an-array!")
