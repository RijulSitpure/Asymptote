from solution import Solution
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
root = TreeNode(1, TreeNode(3, TreeNode(2)), TreeNode(4, TreeNode(6), TreeNode(5, None, TreeNode(7))))
s = Solution()
assert s.treeQueries(root, [4]) == [2]
assert s.treeQueries(root, [3, 2]) == [3, 3]
print('All tests passed for height-of-binary-tree-after-subtree-removal-queries!')
