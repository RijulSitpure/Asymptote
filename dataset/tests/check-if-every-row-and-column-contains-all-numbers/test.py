from solution import Solution

s = Solution()
assert s.checkValid([[1,2,3],[3,1,2],[2,3,1]]) == True
assert s.checkValid([[1,1,1],[1,2,3],[1,2,3]]) == False
print("All tests passed for check-if-every-row-and-column-contains-all-numbers!")
