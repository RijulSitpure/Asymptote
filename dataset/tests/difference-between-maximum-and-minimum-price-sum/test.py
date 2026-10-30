from solution import Solution
s = Solution()
assert s.maxOutput(6, [[0,1],[1,2],[1,3],[3,4],[3,5]], [9,8,7,6,10,5]) == 24
assert s.maxOutput(3, [[0,1],[1,2]], [1,1,1]) == 2
print('All tests passed for difference-between-maximum-and-minimum-price-sum!')
