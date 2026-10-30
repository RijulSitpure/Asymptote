from solution import Solution
s = Solution()
assert s.maximizeWin([1,1,2,2,3,3,5], 2) == 7
assert s.maximizeWin([1,2,3,4], 0) == 2
print('All tests passed for maximize-win-from-two-segments!')
