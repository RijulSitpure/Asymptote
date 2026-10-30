from solution import Solution
s = Solution()
assert s.minimumVisitedCells([[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]) == 4
assert s.minimumVisitedCells([[3,4,2,1],[4,2,1,1],[2,1,1,0],[2,4,1,0]]) == 4
assert s.minimumVisitedCells([[2,1,0],[1,0,0]]) == -1
print('All tests passed for minimum-number-of-visited-cells-in-a-grid!')
