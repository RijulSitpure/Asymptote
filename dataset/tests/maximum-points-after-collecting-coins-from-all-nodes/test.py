from solution import Solution
s = Solution()
assert s.maximumPoints([[0, 1], [1, 2], [2, 3]], [10, 10, 3, 3], 5) == 11
assert s.maximumPoints([[0, 1], [0, 2]], [8, 4, 4], 0) == 16
print('maximum-points-after-collecting-coins-from-all-nodes passed')
