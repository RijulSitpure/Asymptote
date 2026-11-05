from solution import Solution

s = Solution()
assert s.isArraySpecial([1]) == True
assert s.isArraySpecial([2, 1, 4]) == True
assert s.isArraySpecial([4, 3, 1, 6]) == False
print("All tests passed successfully.")
