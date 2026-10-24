import sys
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res = []
        stack = [root]
        while stack:
            node = stack.pop()
            res.append(node.val)
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
        return res

def test():
    sol = Solution()
    # [1, null, 2, 3] -> [1, 2, 3]
    root = TreeNode(1, None, TreeNode(2, TreeNode(3), None))
    assert sol.preorderTraversal(root) == [1, 2, 3], "test 1 failed"
    assert sol.preorderTraversal(None) == [], "test 2 failed"
    print("✓ binary-tree-preorder-traversal passed")

if __name__ == "__main__":
    test()
