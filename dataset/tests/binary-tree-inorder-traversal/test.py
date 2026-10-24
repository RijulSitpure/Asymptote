import sys
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        stack = []
        curr = root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            res.append(curr.val)
            curr = curr.right
        return res

def test():
    sol = Solution()
    # [1, null, 2, 3]
    root = TreeNode(1)
    root.right = TreeNode(2)
    root.right.left = TreeNode(3)
    assert sol.inorderTraversal(root) == [1, 3, 2], "test 1 failed"
    assert sol.inorderTraversal(None) == [], "test 2 failed"
    print("✓ binary-tree-inorder-traversal passed")

if __name__ == "__main__":
    test()
