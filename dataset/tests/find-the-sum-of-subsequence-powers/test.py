from solution import Solution

s = Solution()
assert s.sumOfPowers([1, 2, 3, 4], 3) == 4
assert s.sumOfPowers([2, 2], 2) == 0
assert s.sumOfPowers([4, 3, -1], 2) == 10
print("All tests passed successfully.")
