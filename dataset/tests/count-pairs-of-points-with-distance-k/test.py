from solution import Solution
s = Solution()
assert s.countPairs([[1, 2], [4, 2], [1, 3], [5, 2]], 5) == 2
assert s.countPairs([[1, 3], [1, 3], [1, 3], [1, 3], [1, 3]], 0) == 10
print("count-pairs-of-points-with-distance-k passed")
