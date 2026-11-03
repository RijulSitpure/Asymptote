from solution import Solution
from solution import BigArray
s = Solution()
assert s.countBlocks(BigArray([3, 3, 3, 3, 3])) == 1
assert s.countBlocks(BigArray([1, 1, 1, 3, 9, 9, 9, 2, 10, 10])) == 5
print('number-of-equal-numbers-blocks passed')
