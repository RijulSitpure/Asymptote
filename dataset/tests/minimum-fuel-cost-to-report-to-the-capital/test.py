from solution import Solution
s = Solution()
assert s.minimumFuelCost([[0,1],[0,2],[0,3]], 5) == 3
assert s.minimumFuelCost([[3,1],[3,2],[1,0],[0,4],[0,5],[4,6]], 2) == 7
assert s.minimumFuelCost([], 1) == 0
print('All tests passed for minimum-fuel-cost-to-report-to-the-capital!')
