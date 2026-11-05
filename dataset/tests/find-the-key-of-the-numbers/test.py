from solution import Solution
sol = Solution()
assert sol.generateKey(1, 10, 1000) == 0
assert sol.generateKey(987, 879, 798) == 777
assert sol.generateKey(1, 2, 3) == 1
print("All tests passed successfully.")
