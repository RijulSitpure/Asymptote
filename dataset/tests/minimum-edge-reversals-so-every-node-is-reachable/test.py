from solution import Solution
s = Solution()
assert s.minEdgeReversals(4, [[2, 0], [2, 1], [1, 3]]) == [1, 1, 0, 2]
assert s.minEdgeReversals(3, [[1, 2], [2, 0]]) == [2, 0, 1]
print("minimum-edge-reversals-so-every-node-is-reachable passed")
