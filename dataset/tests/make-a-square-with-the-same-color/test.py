from solution import Solution

s = Solution()
assert s.canMakeSquare([["B", "W", "B"], ["B", "W", "W"], ["B", "W", "B"]]) == True
assert s.canMakeSquare([["B", "W", "B"], ["W", "B", "W"], ["B", "W", "B"]]) == False
assert s.canMakeSquare([["B", "W", "B"], ["B", "W", "W"], ["B", "W", "W"]]) == True
print("All tests passed successfully.")
