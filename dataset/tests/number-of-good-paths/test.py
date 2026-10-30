from solution import Solution
s = Solution()
assert s.numberOfGoodPaths([1,3,2,1,3], [[0,1],[0,2],[2,3],[2,4]]) == 6
assert s.numberOfGoodPaths([1,1,2,2,3], [[0,1],[1,2],[2,3],[2,4]]) == 7
print("All tests passed for number-of-good-paths!")
