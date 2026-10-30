from typing import Optional
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from solution import Solution
s = Solution()
r = TreeNode(5, TreeNode(4, TreeNode(1), TreeNode(10)), TreeNode(9, None, TreeNode(7)))
res = s.replaceValueInTree(r)
assert res.val == 0
assert res.left.val == 0
assert res.right.val == 0
assert res.left.left.val == 7
assert res.left.right.val == 7
assert res.right.right.val == 11
print('All tests passed for cousins-in-binary-tree-ii!')
