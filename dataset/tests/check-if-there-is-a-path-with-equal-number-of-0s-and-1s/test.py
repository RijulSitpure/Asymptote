from solution import Solution
s = Solution()
assert s.isThereAPath([[0,1,0,0],[0,1,0,0],[1,0,1,0]]) == True
assert s.isThereAPath([[1,1,0],[0,0,1],[1,0,0]]) == False
print('All tests passed for check-if-there-is-a-path-with-equal-number-of-0s-and-1s!')
