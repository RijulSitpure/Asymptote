from solution import Solution
s = Solution()
assert s.smallestTrimmedNumbers(['102','473','059','299'], [[1,1],[2,3],[4,2],[1,2]]) == [0, 0, 3, 0]
assert s.smallestTrimmedNumbers(['24','37','96','04'], [[2,1],[2,2]]) == [3, 0]
print("All tests passed for query-kth-smallest-trimmed-number!")
