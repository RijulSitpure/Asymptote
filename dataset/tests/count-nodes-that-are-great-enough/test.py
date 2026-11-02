class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from solution import Solution
s = Solution()

# Construct tree: [7,6,5,4,3,2,1], k = 2
#        7
#      /   \
#     6     5
#    / \   / \
#   4   3 2   1
r = TreeNode(7)
r.left = TreeNode(6, TreeNode(4), TreeNode(3))
r.right = TreeNode(5, TreeNode(2), TreeNode(1))
assert s.countGreatEnoughNodes(r, 2) == 3
print("All tests passed for count-nodes-that-are-great-enough")