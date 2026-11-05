from solution import Solution
sol = Solution()
assert sol.winningPlayerCount(4, [[0,0],[1,0],[1,0],[2,1],[2,1],[2,0]]) == 2
assert sol.winningPlayerCount(5, [[1,1],[1,2],[1,3],[1,4]]) == 0
assert sol.winningPlayerCount(5, [[1,1],[2,4],[2,4],[2,4]]) == 1
print("All tests passed successfully.")
