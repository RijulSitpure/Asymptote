from solution import Solution
s = Solution()
assert s.closestNode(7, [[0,1],[0,2],[0,3],[1,4],[2,5],[2,6]], [[5,3,4],[5,3,6]]) == [0,2]
assert s.closestNode(3, [[0,1],[1,2]], [[0,1,2]]) == [1]
print("All tests passed for closest-node-to-path-in-tree!")
