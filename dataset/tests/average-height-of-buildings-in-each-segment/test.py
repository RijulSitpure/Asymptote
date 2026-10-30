from solution import Solution

s = Solution()
assert s.averageHeightOfBuildings([[1,4,2],[3,9,4]]) == [[1,3,2],[3,4,3],[4,9,4]]
assert s.averageHeightOfBuildings([[1,3,2],[2,5,3],[2,8,3]]) == [[1,3,2],[3,8,3]]
print('OK')