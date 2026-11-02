from solution import Solution
s = Solution()
assert s.maximumCoins([1, 4, 2], [1, 1, 5, 2, 3], [2, 3, 4, 5, 6]) == [5, 16, 10]
assert s.maximumCoins([5], [2, 3, 1, 2], [10, 6, 5, 2]) == [23]
assert s.maximumCoins([4, 4], [5, 7, 8], [1, 1, 1]) == [0, 0]
print("maximum-coins-heroes-can-collect passed")
