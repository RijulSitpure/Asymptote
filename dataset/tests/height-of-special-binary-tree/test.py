class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from solution import Solution
s = Solution()

# Leaf node pointing to itself or linked
r1 = TreeNode(1)
l1 = TreeNode(2)
r1.left = l1
# Make leaf circular link
l1.right = r1
assert s.heightOfTree(r1) == 0

# Tree with depth 1
r2 = TreeNode(1)
l2 = TreeNode(2)
r_child = TreeNode(3)
r2.left = l2
r2.right = r_child
l2.right = l2  # not pointing to parent
# If leaves form circular doubly linked list:
l2.left = r_child
l2.right = r_child
r_child.left = l2
r_child.right = l2
# l2.right != r2, so from r2 it continues to children which have leaf.left.right == leaf
# For leaf l2: l2.left.right == l2 (since r_child.right == l2)
assert s.heightOfTree(r2) == 1
print("All tests passed for height-of-special-binary-tree")