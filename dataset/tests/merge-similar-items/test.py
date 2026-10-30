from solution import Solution
s = Solution()
assert s.mergeSimilarItems([[1,1],[4,5],[3,8]], [[3,1],[1,5]]) == [[1,6],[3,9],[4,5]]
assert s.mergeSimilarItems([[1,1],[3,2],[2,3]], [[2,1],[3,2],[1,3]]) == [[1,4],[2,4],[3,4]]
print("All tests passed for merge-similar-items!")
