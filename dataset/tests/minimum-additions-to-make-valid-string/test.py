from solution import Solution
s = Solution()
assert s.addMinimum('b') == 2
assert s.addMinimum('aaa') == 6
assert s.addMinimum('abc') == 0
print('All tests passed for minimum-additions-to-make-valid-string!')
