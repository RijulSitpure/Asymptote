from solution import Solution

s = Solution()
assert s.countSubmatrices([[7, 6, 3], [6, 6, 1]], 18) == 4
assert s.countSubmatrices([[7, 2, 9], [1, 5, 0], [2, 6, 6]], 20) == 6
print("count-submatrices-with-top-left-element-and-sum-less-than-k tests passed!")
