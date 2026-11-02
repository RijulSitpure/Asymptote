from solution import Solution
s = Solution()
assert s.maxProfit([10, 2, 3, 4], [100, 2, 7, 10]) == 19
assert s.maxProfit([1, 2, 3, 4, 5], [1, 5, 3, 4, 6]) == 15
assert s.maxProfit([4, 3, 2, 1], [33, 20, 19, 87]) == -1
print("maximum-profitable-triplets-with-increasing-prices-i passed")
