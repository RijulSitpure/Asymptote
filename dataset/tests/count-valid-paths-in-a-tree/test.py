from solution import Solution
s = Solution()
assert s.countPaths(5, [[1, 2], [1, 3], [2, 4], [2, 5]]) == 4
assert s.countPaths(6, [[1, 2], [1, 3], [2, 4], [3, 5], [3, 6]]) == 6
print("count-valid-paths-in-a-tree passed")
