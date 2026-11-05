from solution import Solution
sol = Solution()
assert sol.finalPositionOfSnake(2, ["RIGHT", "DOWN"]) == 3
assert sol.finalPositionOfSnake(3, ["DOWN", "RIGHT", "UP"]) == 1
print("All tests passed successfully.")
