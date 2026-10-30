from solution import Solution
s = Solution()
assert s.isWinner([4, 10, 7, 9], [6, 5, 2, 3]) == 1
assert s.isWinner([3, 5, 7, 6], [8, 10, 10, 2]) == 2
assert s.isWinner([2, 3], [4, 1]) == 0
print('All tests passed for determine-the-winner-of-a-bowling-game!')
