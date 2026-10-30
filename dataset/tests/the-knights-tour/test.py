from solution import Solution
s = Solution()
res = s.checkValidGrid(5, 5, 0, 0)
assert res[0][0] == 0
visited = set(val for row in res for val in row)
assert len(visited) == 25 and -1 not in visited
print('All tests passed for the-knights-tour!')
