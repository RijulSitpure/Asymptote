from solution import Solution
s = Solution()
assert s.maxValueOfCoins([[1,100,3],[7,8,9]], 2) == 101
assert s.maxValueOfCoins([[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], 7) == 706
print("All tests passed for maximum-value-of-k-coins-from-piles!")
