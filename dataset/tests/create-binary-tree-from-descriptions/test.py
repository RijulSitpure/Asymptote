from solution import Solution
from solution import TreeNode
s = Solution()
res = s.createBinaryTree([[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]])
assert res.val == 50
print("All tests passed for create-binary-tree-from-descriptions!")
