import sys
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def upsideDownBinaryTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        curr = root
        prev = None
        prev_right = None
        while curr:
            next_left = curr.left
            next_right = curr.right
            curr.left = prev_right
            curr.right = prev
            prev = curr
            prev_right = next_right
            curr = next_left
        return prev

def test():
    sol = Solution()
    # [1, 2, 3, 4, 5]
    root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
    new_root = sol.upsideDownBinaryTree(root)
    assert new_root.val == 4, "test 1 root failed"
    assert new_root.left.val == 5, "test 1 left failed"
    assert new_root.right.val == 2, "test 1 right failed"
    assert sol.upsideDownBinaryTree(None) is None, "test 2 failed"
    print("✓ binary-tree-upside-down passed")

if __name__ == "__main__":
    test()
