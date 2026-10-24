from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sumRootToLeaf(self, root: Optional[TreeNode]) -> int:
        def dfs(node: Optional[TreeNode], val: int) -> int:
            if not node:
                return 0
            val = (val << 1) | node.val
            if not node.left and not node.right:
                return val
            return dfs(node.left, val) + dfs(node.right, val)
        return dfs(root, 0)

def test():
    sol = Solution()
    # [1,0,1,0,1,0,1]
    root = TreeNode(1, TreeNode(0, TreeNode(0), TreeNode(1)), TreeNode(1, TreeNode(0), TreeNode(1)))
    assert sol.sumRootToLeaf(root) == 22, "test 1 failed"
    print("✓ sum-of-root-to-leaf-binary-numbers passed")

if __name__ == "__main__":
    test()
