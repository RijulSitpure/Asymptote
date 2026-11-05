from solution import Solution

s = Solution()
assert s.maximumValueSum([1, 2, 1], 3, [[0, 1], [0, 2]]) == 6
assert s.maximumValueSum([2, 3], 7, [[0, 1]]) == 9
assert s.maximumValueSum([7, 7, 7, 7, 7, 7], 3, [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]]) == 42
print("find-the-maximum-sum-of-node-values tests passed!")
