from solution import Solution
s = Solution()
assert s.numberOfSets(3, 5, [[0, 1, 2], [1, 2, 10], [0, 2, 10]]) == 5
assert s.numberOfSets(3, 5, [[0, 1, 20], [0, 1, 10], [1, 2, 2], [0, 2, 2]]) == 7
assert s.numberOfSets(1, 10, []) == 2
print('number-of-possible-sets-of-closing-branches passed')
