from solution import Solution

s = Solution()
assert s.unmarkedSumArray([1, 2, 2, 1, 2, 3, 1], [[1, 2], [3, 3], [4, 2]]) == [8, 3, 0]
assert s.unmarkedSumArray([1, 4, 2, 3], [[0, 1]]) == [7]
print("mark-elements-on-array-by-performing-queries tests passed!")
