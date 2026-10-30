from solution import Solution
s = Solution()
assert s.maxXor(6, [[0,1],[0,2],[1,3],[1,4],[2,5]], [2,8,3,6,2,5]) == 24
assert s.maxXor(3, [[0,1],[1,2]], [4,6,1]) == 0
print('All tests passed for maximum-xor-of-two-non-overlapping-subtrees!')
