from solution import Solution
s = Solution()
assert s.leftmostBuildingQueries([6, 4, 8, 5, 2, 7], [[0, 1], [0, 3], [2, 4], [3, 4], [2, 2]]) == [2, 5, -1, 5, 2]
assert s.leftmostBuildingQueries([5, 3, 8, 2, 6, 1, 4, 6], [[0, 7], [3, 5], [5, 2], [3, 0], [1, 6]]) == [7, 6, -1, 4, 6]
print('find-building-where-alice-and-bob-can-meet passed')
