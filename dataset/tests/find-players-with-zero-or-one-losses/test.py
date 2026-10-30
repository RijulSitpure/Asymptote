from solution import Solution
s = Solution()
assert s.findWinners([[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]) == [[1,2,10],[4,5,7,8]]
assert s.findWinners([[2,3],[1,3],[5,4],[6,4]]) == [[1,2,5,6],[]]
print("All tests passed for find-players-with-zero-or-one-losses!")
