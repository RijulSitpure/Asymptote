class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from solution import Solution
s = Solution()
assert s.averageOfSubtree(TreeNode(4, TreeNode(8, TreeNode(0), TreeNode(1)), TreeNode(5, None, TreeNode(6)))) == 5
assert s.averageOfSubtree(TreeNode(1)) == 1
print("All tests passed for count-nodes-equal-to-average-of-subtree!")
