from solution import Solution
s = Solution()
assert s.maxPoints([[1,2,3],[2,5,7],[3,5,1]], [5,6,2]) == [5,8,1]
assert s.maxPoints([[5,2,1],[1,1,2]], [3]) == [0]
print('All tests passed for maximum-number-of-points-from-grid-queries!')
