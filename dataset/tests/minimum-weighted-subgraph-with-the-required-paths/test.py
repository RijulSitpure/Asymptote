from solution import Solution
s = Solution()
assert s.minimumWeight(6, [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], 0, 1, 5) == 9
assert s.minimumWeight(3, [[2,1,1]], 0, 1, 2) == -1
print("All tests passed for minimum-weighted-subgraph-with-the-required-paths!")
