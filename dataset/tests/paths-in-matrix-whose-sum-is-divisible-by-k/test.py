from solution import Solution
s = Solution()
assert s.numberOfPaths([[5,2,4],[3,0,5],[0,7,2]], 3) == 2
assert s.numberOfPaths([[0,0]], 5) == 1
assert s.numberOfPaths([[7,3,4,9],[2,3,6,2],[2,3,7,0]], 1) == 10
print("All tests passed for paths-in-matrix-whose-sum-is-divisible-by-k!")
