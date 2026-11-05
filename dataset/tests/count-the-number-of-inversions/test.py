from solution import Solution

s = Solution()
assert s.numberOfPermutations(3, [[2, 2], [0, 0]]) == 2
assert s.numberOfPermutations(3, [[2, 2], [1, 1], [0, 0]]) == 1
assert s.numberOfPermutations(2, [[0, 0], [1, 0]]) == 1
print('All tests passed successfully.')