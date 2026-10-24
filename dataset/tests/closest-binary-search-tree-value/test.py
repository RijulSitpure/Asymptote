import sys
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        closest = root.val
        curr = root
        while curr:
            diff = abs(curr.val - target)
            best_diff = abs(closest - target)
            if diff < best_diff or (diff == best_diff and curr.val < closest):
                closest = curr.val
            if target < curr.val:
                curr = curr.left
            else:
                curr = curr.right
        return closest

def test():
    sol = Solution()
    # [4,2,5,1,3], target = 3.714286 -> 4
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(5))
    assert sol.closestValue(root, 3.714286) == 4, "test 1 failed"
    # [1], target = 4.428571 -> 1
    assert sol.closestValue(TreeNode(1), 4.428571) == 1, "test 2 failed"
    print("✓ closest-binary-search-tree-value passed")

if __name__ == "__main__":
    test()
