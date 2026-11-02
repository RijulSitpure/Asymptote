from solution import Solution
s = Solution()
assert s.maxProfit([10, 2, 3, 4, 5], [5, 4, 3, 2, 1]) == 9
assert s.maxProfit([1, 5, 3, 7, 8], [1, 5, 3, 7, 8]) == 20
assert s.maxProfit([4, 3, 2, 1], [1, 2, 3, 4]) == -1
print('maximum-profitable-triplets-with-increasing-prices-ii passed')
