import sys
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res = []
        stack = [root]
        while stack:
            node = stack.pop()
            res.append(node.val)
            if node.left:
                stack.append(node.left)
            if node.right:
                stack.append(node.right)
        return res[::-1]

def test():
    sol = Solution()
    # [1, null, 2, 3] -> [3, 2, 1]
    root = TreeNode(1, None, TreeNode(2, TreeNode(3), None))
    assert sol.postorderTraversal(root) == [3, 2, 1], "test 1 failed"
    assert sol.postorderTraversal(None) == [], "test 2 failed"
    print("✓ binary-tree-postorder-traversal passed")

if __name__ == "__main__":
    test()
