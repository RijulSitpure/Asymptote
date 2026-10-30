from solution import Solution

s = Solution()
assert s.smallestMissingValueSubtree([-1,0,0,2], [1,2,3,4]) == [5,1,1,1]
assert s.smallestMissingValueSubtree([-1,0,1,0,3,3], [5,4,6,2,1,3]) == [7,1,1,4,2,1]
print('OK')