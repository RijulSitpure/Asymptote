from solution import Solution
s = Solution()
assert s.checkValidGrid([[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]) == True
assert s.checkValidGrid([[0,3,6],[5,8,1],[2,7,4]]) == False
print('All tests passed for check-knight-tour-configuration!')
