from solution import Solution
s = Solution()
assert s.minimumSeconds([1, 2, 1, 2]) == 1
assert s.minimumSeconds([2, 1, 3, 3, 2]) == 2
assert s.minimumSeconds([5, 5, 5, 5]) == 0
print("minimum-seconds-to-equalize-a-circular-array passed")
