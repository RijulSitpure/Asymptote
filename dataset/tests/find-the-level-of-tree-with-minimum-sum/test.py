class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

import builtins
builtins.TreeNode = TreeNode

from solution import Solution

s = Solution()
root = TreeNode(50, TreeNode(10), TreeNode(80))
assert s.minimumLevel(root) == 1
root2 = TreeNode(50, TreeNode(10, TreeNode(1), TreeNode(2)), TreeNode(10))
assert s.minimumLevel(root2) == 3
print('All tests passed successfully.')