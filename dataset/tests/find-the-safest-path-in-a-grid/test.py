from solution import Solution
s = Solution()
assert s.maximumSafenessFactor([[1,0,0],[0,0,0],[0,0,1]]) == 0
assert s.maximumSafenessFactor([[0,0,1],[0,0,0],[0,0,0]]) == 2
assert s.maximumSafenessFactor([[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]) == 2
print("find-the-safest-path-in-a-grid passed")
