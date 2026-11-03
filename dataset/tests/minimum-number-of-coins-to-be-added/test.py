from solution import Solution
s = Solution()
assert s.minimumAddedCoins([1, 4, 10], 19) == 2
assert s.minimumAddedCoins([1, 4, 10, 5, 7, 19], 19) == 1
assert s.minimumAddedCoins([1, 1, 1], 20) == 3
print('minimum-number-of-coins-to-be-added passed')
