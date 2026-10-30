from solution import Solution
s = Solution()
assert s.maximumImportance(5, [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]) == 43
assert s.maximumImportance(5, [[0,3],[2,4],[1,3]]) == 20
print("All tests passed for maximum-total-importance-of-roads!")
