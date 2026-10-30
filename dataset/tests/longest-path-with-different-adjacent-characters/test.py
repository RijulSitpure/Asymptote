from solution import Solution
s = Solution()
assert s.longestPath([-1,0,0,1,1,2], "abacbe") == 3
assert s.longestPath([-1,0,0,0], "aabc") == 3
print("All tests passed for longest-path-with-different-adjacent-characters!")
