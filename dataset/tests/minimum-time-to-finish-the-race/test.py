from solution import Solution

s = Solution()
assert s.minimumFinishTime([[2,3],[3,4]], 5, 4) == 21
assert s.minimumFinishTime([[1,10],[2,2],[3,4]], 6, 5) == 25
print("All tests passed for minimum-time-to-finish-the-race!")
