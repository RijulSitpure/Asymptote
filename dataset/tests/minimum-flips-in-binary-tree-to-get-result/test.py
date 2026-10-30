class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from solution import Solution
s = Solution()
assert s.minimumFlips(TreeNode(2, TreeNode(3, TreeNode(0), TreeNode(1)), TreeNode(0)), True) == 1
assert s.minimumFlips(TreeNode(0), False) == 0
print("All tests passed for minimum-flips-in-binary-tree-to-get-result!")
