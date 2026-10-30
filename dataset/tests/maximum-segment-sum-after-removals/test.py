from solution import Solution
s = Solution()
assert s.maximumSegmentSum([1,2,5,6,1], [0,3,2,4,1]) == [14, 7, 2, 2, 0]
assert s.maximumSegmentSum([3,2,11,1], [3,2,1,0]) == [16, 5, 3, 0]
print("All tests passed for maximum-segment-sum-after-removals!")
