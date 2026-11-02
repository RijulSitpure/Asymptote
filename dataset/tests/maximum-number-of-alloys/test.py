from solution import Solution
s = Solution()
assert s.maxNumberOfAlloys(3, 2, 15, [[1, 1, 1], [1, 1, 10]], [0, 0, 0], [1, 2, 3]) == 2
assert s.maxNumberOfAlloys(3, 2, 15, [[1, 1, 1], [1, 1, 10]], [0, 0, 100], [1, 2, 3]) == 5
assert s.maxNumberOfAlloys(2, 3, 10, [[2, 1], [1, 2], [1, 1]], [1, 1], [5, 5]) == 2
print("maximum-number-of-alloys passed")
