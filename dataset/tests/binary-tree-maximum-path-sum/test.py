import sys
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        max_sum = float("-inf")

        def gain(node: Optional[TreeNode]) -> int:
            nonlocal max_sum
            if not node:
                return 0
            left_gain = max(gain(node.left), 0)
            right_gain = max(gain(node.right), 0)
            current_path = node.val + left_gain + right_gain
            max_sum = max(max_sum, current_path)
            return node.val + max(left_gain, right_gain)

        gain(root)
        return int(max_sum)

def test():
    sol = Solution()
    # [1, 2, 3] -> 6
    r1 = TreeNode(1, TreeNode(2), TreeNode(3))
    assert sol.maxPathSum(r1) == 6, "test 1 failed"
    # [-10, 9, 20, null, null, 15, 7] -> 42
    r2 = TreeNode(-10, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    assert sol.maxPathSum(r2) == 42, "test 2 failed"
    print("✓ binary-tree-maximum-path-sum passed")

if __name__ == "__main__":
    test()
