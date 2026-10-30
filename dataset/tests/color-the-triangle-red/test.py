from solution import Solution
s = Solution()
res1 = s.colorRed(1)
assert res1 == [[1, 1]]
res2 = s.colorRed(2)
assert [1, 1] in res2 and [2, 1] in res2 and [2, 3] in res2
print('All tests passed for color-the-triangle-red!')
