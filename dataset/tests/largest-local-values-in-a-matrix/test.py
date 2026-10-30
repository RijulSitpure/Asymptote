from solution import Solution
s = Solution()
assert s.largestLocal([[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]) == [[9,9],[8,6]]
assert s.largestLocal([[1,1,1,1,1],[1,1,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,1,1]]) == [[2,2,2],[2,2,2],[2,2,2]]
print("All tests passed for largest-local-values-in-a-matrix!")
