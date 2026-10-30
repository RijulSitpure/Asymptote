from solution import Solution

s = Solution()
assert abs(s.equalizeWater([1,2,7], 80) - 2.00000) < 1e-4
assert abs(s.equalizeWater([2,4,6], 50) - 3.50000) < 1e-4
print("All tests passed for pour-water-between-buckets-to-make-water-levels-equal!")
