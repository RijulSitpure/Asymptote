from solution import Solution

s = Solution()
assert s.satisfiesConditions([[1, 0, 2], [1, 0, 2]]) == True
assert s.satisfiesConditions([[1, 1, 1], [0, 0, 0]]) == False
assert s.satisfiesConditions([[1], [2], [3]]) == False
print("All tests passed successfully.")
