from solution import Solution
s = Solution()
assert s.circularGameLosers(5, 2) == [4, 5]
assert s.circularGameLosers(4, 4) == [2, 3, 4]
print('All tests passed for find-the-losers-of-the-circular-game!')
