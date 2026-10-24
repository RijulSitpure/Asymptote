from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def bstToGst(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        self.total = 0
        def traverse(node: Optional[TreeNode]):
            if not node:
                return
            traverse(node.right)
            self.total += node.val
            node.val = self.total
            traverse(node.left)
        traverse(root)
        return root

def test():
    sol = Solution()
    # [4,1,6,0,2,5,7,None,None,None,3,None,None,None,8]
    root = TreeNode(4,
        TreeNode(1, TreeNode(0), TreeNode(2, None, TreeNode(3))),
        TreeNode(6, TreeNode(5), TreeNode(7, None, TreeNode(8)))
    )
    res = sol.bstToGst(root)
    assert res.val == 30, "test root failed"
    print("✓ binary-search-tree-to-greater-sum-tree passed")

if __name__ == "__main__":
    test()
