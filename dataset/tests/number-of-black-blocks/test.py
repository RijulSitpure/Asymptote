from solution import Solution
s = Solution()
assert s.countBlackBlocks(3, 3, [[0,0]]) == [3, 1, 0, 0, 0]
assert s.countBlackBlocks(3, 3, [[0,0],[1,1],[0,2]]) == [0, 2, 2, 0, 0]
print("All tests passed for number-of-black-blocks")
