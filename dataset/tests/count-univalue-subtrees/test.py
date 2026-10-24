import sys
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        count = 0

        def is_unival(node: Optional[TreeNode]) -> bool:
            nonlocal count
            if not node:
                return True
            left = is_unival(node.left)
            right = is_unival(node.right)
            if left and right:
                if node.left and node.left.val != node.val:
                    return False
                if node.right and node.right.val != node.val:
                    return False
                count += 1
                return True
            return False

        is_unival(root)
        return count

def test():
    sol = Solution()
    # [5,1,5,5,5,null,5] -> 4
    root = TreeNode(5, TreeNode(1, TreeNode(5), TreeNode(5)), TreeNode(5, None, TreeNode(5)))
    assert sol.countUnivalSubtrees(root) == 4, "test 1 failed"
    assert sol.countUnivalSubtrees(None) == 0, "test 2 failed"
    print("✓ count-univalue-subtrees passed")

if __name__ == "__main__":
    test()
