import sys
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        max_len = 0

        def dfs(node: Optional[TreeNode], parent: Optional[TreeNode], cur_len: int):
            nonlocal max_len
            if not node:
                return
            if parent and node.val == parent.val + 1:
                cur_len += 1
            else:
                cur_len = 1
            max_len = max(max_len, cur_len)
            dfs(node.left, node, cur_len)
            dfs(node.right, node, cur_len)

        dfs(root, None, 0)
        return max_len

def test():
    sol = Solution()
    # [1,null,3,2,4,null,null,null,5] -> 3 (3-4-5)
    root = TreeNode(1, None, TreeNode(3, TreeNode(2), TreeNode(4, None, TreeNode(5))))
    assert sol.longestConsecutive(root) == 3, "test 1 failed"
    assert sol.longestConsecutive(None) == 0, "test 2 failed"
    print("✓ binary-tree-longest-consecutive-sequence passed")

if __name__ == "__main__":
    test()
