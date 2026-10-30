from solution import Solution
s = Solution()
assert s.garbageCollection(["G","P","GP","GG"], [2,4,3]) == 21
assert s.garbageCollection(["MMM","PGM","GP"], [3,10]) == 37
print("All tests passed for minimum-amount-of-time-to-collect-garbage!")
