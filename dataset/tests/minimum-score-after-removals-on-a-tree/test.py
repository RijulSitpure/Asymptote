from solution import Solution
s = Solution()
assert s.minimumScore([1,5,5,4,11], [[0,1],[1,2],[1,3],[3,4]]) == 9
assert s.minimumScore([5,5,2,4,4,2], [[0,1],[1,2],[5,2],[4,3],[1,3]]) == 0
print("All tests passed for minimum-score-after-removals-on-a-tree!")
