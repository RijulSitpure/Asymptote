from solution import Solution
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
root = TreeNode(6, TreeNode(2, TreeNode(1), TreeNode(4)), TreeNode(13, TreeNode(9), TreeNode(14, None, TreeNode(15))))
s = Solution()
assert s.closestNodes(root, [2, 5, 16]) == [[2, 2], [4, 6], [15, -1]]
print('All tests passed for closest-nodes-queries-in-a-binary-search-tree!')
