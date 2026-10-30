from solution import Solution
s = Solution()
assert s.firstCompleteIndex([1,3,4,2], [[1,4],[2,3]]) == 2
assert s.firstCompleteIndex([2,8,7,4,1,3,5,6,9], [[3,2,5],[1,4,6],[8,7,9]]) == 3
print('All tests passed for first-completely-painted-row-or-column!')
