from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sufficientSubset(self, root: Optional[TreeNode], limit: int) -> Optional[TreeNode]:
        if not root:
            return None
        if not root.left and not root.right:
            return None if root.val < limit else root
        root.left = self.sufficientSubset(root.left, limit - root.val)
        root.right = self.sufficientSubset(root.right, limit - root.val)
        if not root.left and not root.right:
            return None
        return root

def test():
    sol = Solution()
    root = TreeNode(1, TreeNode(2, TreeNode(-99), TreeNode(-99)), TreeNode(3, TreeNode(4), TreeNode(-99)))
    res = sol.sufficientSubset(root, 1)
    assert res.val == 1, "test root failed"
    assert res.left is None, "test left pruned failed"
    assert res.right.val == 3, "test right kept failed"
    print("✓ insufficient-nodes-in-root-to-leaf-paths passed")

if __name__ == "__main__":
    test()
