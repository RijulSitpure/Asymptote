from solution import Solution
s = Solution()
assert sorted(s.mostPopularCreator(['alice','bob','alice','chris'], ['one','two','three','four'], [5,10,5,4])) == [['alice','one'],['bob','two']]
assert s.mostPopularCreator(['alice'], ['a'], [5]) == [['alice','a']]
print('All tests passed for most-popular-video-creator!')
