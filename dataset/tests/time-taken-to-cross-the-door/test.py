from solution import Solution
s = Solution()
assert s.timeTaken([0,1,1,2,4], [0,1,0,0,1]) == [0,3,1,2,4]
assert s.timeTaken([0,0,0], [1,0,1]) == [0,2,1]
print('All tests passed for time-taken-to-cross-the-door!')
