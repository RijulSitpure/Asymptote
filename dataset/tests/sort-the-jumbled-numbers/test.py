from solution import Solution

s = Solution()
assert s.sortJumbled([8,9,4,0,2,1,3,5,7,6], [991,338,38]) == [338,38,991]
assert s.sortJumbled([0,1,2,3,4,5,6,7,8,9], [786,784,785]) == [784,785,786]
print("All tests passed for sort-the-jumbled-numbers!")
