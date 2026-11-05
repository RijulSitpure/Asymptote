from solution import Solution
sol = Solution()
assert sol.countGoodNodes([[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]) == 7
assert sol.countGoodNodes([[0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,7],[3,8]]) == 6
print("All tests passed successfully.")
