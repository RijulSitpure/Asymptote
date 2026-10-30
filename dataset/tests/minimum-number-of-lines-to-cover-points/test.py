from solution import Solution

s = Solution()
assert s.minimumLines([[0,1],[2,3],[4,5],[4,3]]) == 2
assert s.minimumLines([[0,2],[-2,-2],[1,4]]) == 1
print("All tests passed for minimum-number-of-lines-to-cover-points!")
