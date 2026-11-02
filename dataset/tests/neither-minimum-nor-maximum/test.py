from solution import Solution
s = Solution()
assert s.findNonMinOrMax([3, 2, 1, 4]) in [2, 3]
assert s.findNonMinOrMax([1, 2]) == -1
assert s.findNonMinOrMax([2, 1, 3]) == 2
print("All tests passed for neither-minimum-nor-maximum")
