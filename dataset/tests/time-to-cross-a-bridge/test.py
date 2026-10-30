from solution import Solution
s = Solution()
assert s.findCrossingTime(1, 3, [[1,1,2,1],[1,1,3,1],[1,1,4,1]]) == 6
assert s.findCrossingTime(3, 2, [[1,9,1,8],[10,10,10,10]]) == 50
print('All tests passed for time-to-cross-a-bridge!')
