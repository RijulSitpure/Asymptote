from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def insertIntoMaxTree(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if not root or val > root.val:
            node = TreeNode(val)
            node.left = root
            return node
        root.right = self.insertIntoMaxTree(root.right, val)
        return root

def test():
    sol = Solution()
    # [4,1,3,None,None,2]
    root = TreeNode(4, TreeNode(1), TreeNode(3, TreeNode(2), None))
    res = sol.insertIntoMaxTree(root, 5)
    assert res.val == 5, "test 1 failed"
    assert res.left.val == 4, "test 1 left failed"
    print("✓ maximum-binary-tree-ii passed")

if __name__ == "__main__":
    test()
