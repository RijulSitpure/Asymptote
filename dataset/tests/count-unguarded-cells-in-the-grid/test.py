from solution import Solution
s = Solution()
assert s.countUnguarded(4, 6, [[0,0],[1,1],[2,3]], [[0,1],[2,2],[1,4]]) == 7
assert s.countUnguarded(3, 3, [[1,1]], [[0,1],[1,0],[2,1],[1,2]]) == 4
print("All tests passed for count-unguarded-cells-in-the-grid!")
