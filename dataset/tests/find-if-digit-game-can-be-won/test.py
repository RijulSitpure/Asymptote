from solution import Solution
sol = Solution()
assert sol.canAliceWin([1, 2, 3, 4, 10]) == False
assert sol.canAliceWin([1, 2, 3, 4, 5, 14]) == True
assert sol.canAliceWin([5, 5, 5, 25]) == True
print("All tests passed successfully.")
