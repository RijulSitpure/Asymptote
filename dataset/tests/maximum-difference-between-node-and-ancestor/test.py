from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        def dfs(node: Optional[TreeNode], cur_min: int, cur_max: int) -> int:
            if not node:
                return cur_max - cur_min
            cur_min = min(cur_min, node.val)
            cur_max = max(cur_max, node.val)
            return max(dfs(node.left, cur_min, cur_max), dfs(node.right, cur_min, cur_max))
        return dfs(root, root.val, root.val)

def test():
    sol = Solution()
    # [8,3,10,1,6,None,14,None,None,4,7,13]
    root = TreeNode(8,
        TreeNode(3, TreeNode(1), TreeNode(6, TreeNode(4), TreeNode(7))),
        TreeNode(10, None, TreeNode(14, TreeNode(13), None))
    )
    assert sol.maxAncestorDiff(root) == 7, "test 1 failed"
    print("✓ maximum-difference-between-node-and-ancestor passed")

if __name__ == "__main__":
    test()
