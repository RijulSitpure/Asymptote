from solution import Solution
s = Solution()
assert s.maximumScore([5,2,9,8,4], [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]) == 24
assert s.maximumScore([9,20,6,4,11,12], [[0,3],[5,3],[2,4],[1,3]]) == -1
print("All tests passed for maximum-score-of-a-node-sequence!")
