from solution import Solution
s = Solution()
assert s.latestTimeCatchBus([10,20], [2,17,18,19], 2) == 16
assert s.latestTimeCatchBus([20,30,10], [19,13,26,4,25,11,21], 2) == 20
print("All tests passed for the-latest-time-to-catch-a-bus!")
