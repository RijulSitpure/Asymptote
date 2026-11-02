from solution import Solution
s = Solution()
assert s.maximumJumps([1, 3, 6, 4, 1, 2], 2) == 3
assert s.maximumJumps([1, 3, 6, 4, 1, 2], 3) == 5
assert s.maximumJumps([1, 3, 6, 4, 1, 2], 0) == -1
print("All tests passed for maximum-number-of-jumps-to-reach-the-last-index")