from solution import Solution
s = Solution()
assert s.isPreorder([[0,-1],[1,0],[2,0],[3,2],[4,2]]) == True
assert s.isPreorder([[0,-1],[1,0],[2,0],[4,1],[3,2]]) == False
print("All tests passed for is-array-a-preorder-of-some-binary-tree")
