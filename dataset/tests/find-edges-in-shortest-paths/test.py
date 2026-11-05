from solution import Solution

s = Solution()
assert s.findAnswer(6, [[0, 1, 4], [0, 2, 1], [1, 3, 2], [1, 4, 3], [1, 5, 1], [2, 3, 1], [3, 5, 3], [4, 5, 2]]) == [True, True, True, False, True, True, True, False]
assert s.findAnswer(4, [[2, 0, 6], [0, 1, 4], [1, 3, 2], [2, 1, 1], [2, 3, 5]]) == [False, True, True, False, False]
print("All tests passed successfully.")
