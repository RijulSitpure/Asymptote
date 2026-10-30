from solution import Solution
s = Solution()
assert s.maxStarSum([1,2,3,4,10,-10,-20], [[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]], 2) == 16
assert s.maxStarSum([-5], [], 0) == -5
print('All tests passed for maximum-star-sum-of-a-graph!')
