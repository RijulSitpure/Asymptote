from solution import Solution
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
root = TreeNode(5, TreeNode(8, TreeNode(2, TreeNode(4), TreeNode(6)), TreeNode(1)), TreeNode(9, TreeNode(3), TreeNode(7)))
s = Solution()
assert s.kthLargestLevelSum(root, 2) == 13
assert s.kthLargestLevelSum(root, 1) == 17
print('All tests passed for kth-largest-sum-in-a-binary-tree!')
