from solution import Solution
s = Solution()
assert s.isPossible(5, [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]]) == True
assert s.isPossible(4, [[1,2],[3,4]]) == True
assert s.isPossible(4, [[1,2],[1,3],[1,4]]) == False
print('All tests passed for add-edges-to-make-degrees-of-all-nodes-even!')
