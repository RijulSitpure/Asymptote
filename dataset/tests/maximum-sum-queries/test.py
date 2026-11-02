from solution import Solution
s = Solution()
assert s.maximumSumQueries([4,3,1,2], [2,4,9,5], [[4,1],[1,3],[2,5]]) == [6, 10, 7]
assert s.maximumSumQueries([3,2,5], [2,3,4], [[4,4],[3,2],[1,1]]) == [9, 9, 9]
assert s.maximumSumQueries([2,1], [1,1], [[4,4]]) == [-1]
print("All tests passed for maximum-sum-queries")
