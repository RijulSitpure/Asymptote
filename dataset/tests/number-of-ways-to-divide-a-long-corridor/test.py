from solution import Solution

s = Solution()
assert s.numberOfWays("SSPPSPS") == 3
assert s.numberOfWays("PPSPSP") == 1
assert s.numberOfWays("S") == 0
print("All tests passed for number-of-ways-to-divide-a-long-corridor!")
