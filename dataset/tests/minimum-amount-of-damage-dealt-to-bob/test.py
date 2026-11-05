from solution import Solution
sol = Solution()
assert sol.minDamage(4, [1, 2, 3, 4], [4, 5, 6, 8]) == 39
assert sol.minDamage(1, [1, 1, 1, 1], [1, 2, 3, 4]) == 20
assert sol.minDamage(8, [40], [59]) == 320
print("All tests passed successfully.")
