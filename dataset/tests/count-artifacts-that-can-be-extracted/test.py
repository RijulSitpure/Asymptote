from solution import Solution
s = Solution()
assert s.digArtifacts(2, [[0,0,0,0],[0,1,1,1]], [[0,0],[0,1]]) == 1
assert s.digArtifacts(2, [[0,0,0,0],[0,1,1,1]], [[0,0],[0,1],[1,1]]) == 2
print("All tests passed for count-artifacts-that-can-be-extracted!")
