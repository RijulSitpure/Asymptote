from solution import Solution
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
root = TreeNode(1, TreeNode(4, TreeNode(7), TreeNode(6)), TreeNode(3, TreeNode(8, TreeNode(9)), TreeNode(5, TreeNode(10))))
s = Solution()
assert s.minimumOperations(root) == 3
print('All tests passed for minimum-number-of-operations-to-sort-a-binary-tree-by-level!')
