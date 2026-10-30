from solution import Solution
s = Solution()
assert s.distanceToCycle(7, [[1,2],[2,3],[3,4],[4,1],[0,1],[5,2],[6,5]]) == [1,0,0,0,0,1,2]
assert s.distanceToCycle(9, [[0,1],[1,2],[0,2],[2,6],[6,7],[6,8],[1,3],[3,4],[3,5]]) == [0,0,0,1,2,2,1,2,2]
print("All tests passed for distance-to-a-cycle-in-undirected-graph!")
