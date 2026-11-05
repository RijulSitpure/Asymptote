from solution import Solution

s = Solution()
assert s.maxPotholes("..xxx...xxx", 14) == 6
assert s.maxPotholes("..xxxxx", 4) == 3
assert s.maxPotholes("x.x.xxx...x", 14) == 6
print("All tests passed successfully.")
