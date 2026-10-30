from solution import Solution
s = Solution()
assert s.reachableNodes(7, [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], [4,5]) == 4
assert s.reachableNodes(7, [[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]], [4,2,1]) == 3
print("All tests passed for reachable-nodes-with-restrictions!")
