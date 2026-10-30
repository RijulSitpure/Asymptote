from solution import Solution
s = Solution()
assert s.minimumObstacles([[0,1,1],[1,1,0],[1,1,0]]) == 2
assert s.minimumObstacles([[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]) == 0
print("All tests passed for minimum-obstacle-removal-to-reach-corner!")
