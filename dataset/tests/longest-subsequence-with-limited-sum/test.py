from solution import Solution
s = Solution()
assert s.answerQueries([4,5,2,1], [3,10,21]) == [2,3,4]
assert s.answerQueries([2,3,4,5], [1]) == [0]
print("All tests passed for longest-subsequence-with-limited-sum!")
