from solution import Solution
s = Solution()
assert s.minCost([4, 2, 2, 2], [1, 4, 1, 2]) == 1
assert s.minCost([2, 3, 4, 1], [3, 2, 5, 1]) == -1
assert s.minCost([4, 4, 4, 4, 3], [5, 5, 5, 5, 3]) == 8
print('All tests passed for rearranging-fruits!')
