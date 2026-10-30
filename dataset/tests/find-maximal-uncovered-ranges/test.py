from solution import Solution
s = Solution()
assert s.findMaximalUncoveredRanges(10, [[3, 5], [7, 8]]) == [[0, 2], [6, 6], [9, 9]]
assert s.findMaximalUncoveredRanges(3, [[0, 2]]) == []
assert s.findMaximalUncoveredRanges(7, []) == [[0, 6]]
print('All tests passed for find-maximal-uncovered-ranges!')
