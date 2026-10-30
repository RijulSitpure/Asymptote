from solution import Solution
s = Solution()
assert s.rootCount([[0, 1], [1, 2], [1, 3], [4, 2]], [[1, 3], [0, 1], [1, 0], [2, 4]], 3) == 3
assert s.rootCount([[0, 1], [1, 2], [2, 3], [3, 4]], [[1, 0], [3, 4], [2, 1], [3, 2]], 1) == 5
print('All tests passed for count-number-of-possible-root-nodes!')
