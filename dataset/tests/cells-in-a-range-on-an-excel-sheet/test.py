from solution import Solution
s = Solution()
assert s.cellsInRange("K1:L2") == ["K1","K2","L1","L2"]
assert s.cellsInRange("A1:F1") == ["A1","B1","C1","D1","E1","F1"]
print("All tests passed for cells-in-a-range-on-an-excel-sheet!")
