from solution import Solution
s = Solution()
assert s.hasValidPath([["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]] ) == True
assert s.hasValidPath([[")",")"],["(","("]]) == False
print("All tests passed for check-if-there-is-a-valid-parentheses-string-path!")
