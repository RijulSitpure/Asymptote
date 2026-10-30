from solution import Solution
s = Solution()
assert s.maximumMinutes([[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,2,0],[0,0,2,2,2,0,2],[0,0,0,0,0,0,0]]) == 3
assert s.maximumMinutes([[0,0,0,0],[0,1,2,0],[0,2,0,0]]) == -1
assert s.maximumMinutes([[0,0,0],[2,2,0],[1,2,0]]) == 1000000000
print("All tests passed for escape-the-spreading-fire!")
