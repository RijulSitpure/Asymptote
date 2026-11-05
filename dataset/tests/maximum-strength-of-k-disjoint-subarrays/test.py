from solution import Solution

s = Solution()
assert s.maximumStrength([1, 2, 3, -1, 2], 3) == 22
assert s.maximumStrength([12, -2, -2, -2, -2], 5) == 64
assert s.maximumStrength([-1, -2, -3], 1) == -1
print("maximum-strength-of-k-disjoint-subarrays tests passed!")
