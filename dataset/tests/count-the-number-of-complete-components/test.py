from solution import Solution
s = Solution()
assert s.countCompleteComponents(6, [[0,1],[0,2],[1,2],[3,4]]) == 3
assert s.countCompleteComponents(6, [[0,1],[0,2],[1,2],[3,4],[3,5]]) == 1
print('All tests passed for count-the-number-of-complete-components!')
