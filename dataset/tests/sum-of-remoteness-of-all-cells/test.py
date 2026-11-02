from solution import Solution
s = Solution()
assert s.sumRemoteness([[-1, 1, -1], [-1, 2, -1], [-1, 3, -1]]) == 0
assert s.sumRemoteness([[-1, 3, 3], [-1, -1, -1], [-1, -1, -1]]) == 0
assert s.sumRemoteness([[1, -1], [-1, 2]]) == 3
print("sum-of-remoteness-of-all-cells passed")
