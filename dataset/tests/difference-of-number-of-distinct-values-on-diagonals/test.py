from solution import Solution
s = Solution()
assert s.differenceOfDistinctValues([[1,2,3],[3,1,5],[3,2,1]]) == [[1,1,0],[1,0,1],[0,1,1]]
assert s.differenceOfDistinctValues([[1]]) == [[0]]
print("All tests passed for difference-of-number-of-distinct-values-on-diagonals")
