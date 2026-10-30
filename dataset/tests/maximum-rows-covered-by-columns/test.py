from solution import Solution
s = Solution()
assert s.maximumRows([[0,0,0],[1,0,1],[0,1,1],[0,0,1]], 2) == 3
assert s.maximumRows([[1],[0]], 1) == 2
print("All tests passed for maximum-rows-covered-by-columns!")
