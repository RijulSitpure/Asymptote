from solution import Solution

s = Solution()
assert s.numberOfArrays([1, -3, 4], 1, 6) == 2
assert s.numberOfArrays([3, -4, 5, 1, -2], -4, 5) == 4
assert s.numberOfArrays([4, -7, 2], 3, 6) == 0
print("All tests passed for count-the-hidden-sequences!")
