from solution import Solution
s = Solution()
assert s.numberOfWays(3, 2, 2, [1, 1], [2, 2]) == 2
assert s.numberOfWays(3, 4, 3, [1, 2], [2, 3]) == 9
assert s.numberOfWays(3, 3, 1, [1, 1], [2, 2]) == 0
print("number-of-ways-to-reach-destination-in-the-grid passed")
