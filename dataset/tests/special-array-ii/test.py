from solution import Solution

s = Solution()
assert s.isArraySpecial([3, 4, 1, 2, 6], [[0, 4], [1, 3]]) == [False, True]
assert s.isArraySpecial([4, 3, 1, 6], [[0, 2], [2, 3]]) == [False, True]
print("All tests passed successfully.")
