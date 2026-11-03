from solution import Solution
s = Solution()
assert s.maximizeSquareHoleArea(2, 1, [2, 3], [2]) == 4
assert s.maximizeSquareHoleArea(1, 1, [2], [2]) == 4
assert s.maximizeSquareHoleArea(2, 3, [2, 3], [2, 3, 4]) == 9
print('maximize-area-of-square-hole-in-grid passed')
