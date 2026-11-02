from solution import Solution
s = Solution()
assert s.minOperationsQueries(7, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 2], [4, 5, 2], [5, 6, 2]], [[0, 3], [3, 6], [2, 6], [0, 6]]) == [0, 0, 1, 3]
assert s.minOperationsQueries(8, [[1, 2, 6], [1, 3, 4], [2, 4, 6], [2, 5, 3], [3, 6, 6], [3, 0, 6], [0, 7, 1]], [[1, 2], [0, 6], [0, 7], [4, 7]]) == [0, 0, 0, 2]
print("minimum-edge-weight-equilibrium-queries-in-a-tree passed")
