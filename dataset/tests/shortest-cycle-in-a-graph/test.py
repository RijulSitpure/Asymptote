from solution import Solution
s = Solution()
assert s.findShortestCycle(7, [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6], [6, 3]]) == 3
assert s.findShortestCycle(4, [[0, 1], [0, 2]]) == -1
print('All tests passed for shortest-cycle-in-a-graph!')
