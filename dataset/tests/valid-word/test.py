from solution import Solution

s = Solution()
assert s.isValid("234Adas") == True
assert s.isValid("b3") == False
assert s.isValid("a3$e") == False
print("All tests passed successfully.")
