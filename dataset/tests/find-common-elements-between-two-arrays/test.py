from solution import Solution
s = Solution()
assert s.findIntersectionValues([4, 3, 2, 3, 1], [2, 2, 5, 2, 3, 6]) == [3, 4]
assert s.findIntersectionValues([3, 4, 2, 3], [1, 5]) == [0, 0]
print('find-common-elements-between-two-arrays passed')
