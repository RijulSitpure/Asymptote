from solution import Solution
s = Solution()
assert s.minimumDistance(4, [[0,1,1],[1,2,3],[2,3,2],[0,3,4]], 0, [2,3]) == 4
assert s.minimumDistance(5, [[0,1,2],[0,2,4],[1,3,1],[2,3,3],[3,4,2]], 0, [4]) == 5
assert s.minimumDistance(4, [[0,1,1],[1,2,3]], 0, [3]) == -1
print("All tests passed for find-the-closest-marked-node")
