from solution import Solution
s = Solution()
g1 = [[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]]
assert s.maxSum(g1) == 30
g2 = [[1,2,3],[4,5,6],[7,8,9]]
assert s.maxSum(g2) == 35
print("All tests passed for maximum-sum-of-an-hourglass!")
