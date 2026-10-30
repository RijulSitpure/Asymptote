from solution import Solution
s = Solution()
assert s.magnificentSets(6, [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]) == 4
assert s.magnificentSets(3, [[1,2],[2,3],[3,1]]) == -1
print('All tests passed for divide-nodes-into-the-maximum-number-of-groups!')
