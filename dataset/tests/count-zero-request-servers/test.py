from solution import Solution
s = Solution()
assert s.countServers(3, [[1,3],[2,6],[1,5]], 5, [10, 11]) == [1, 2]
assert s.countServers(3, [[2,4],[2,1],[1,2],[3,1]], 2, [3, 4]) == [0, 1]
print("All tests passed for count-zero-request-servers")
