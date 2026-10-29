class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getTargetCopy(self, original: TreeNode, cloned: TreeNode, target: TreeNode) -> TreeNode:
        if not original:
            return None
        if original is target:
            return cloned
        return self.getTargetCopy(original.left, cloned.left, target) or self.getTargetCopy(original.right, cloned.right, target)

# Tree: 7 -> (4, 3 -> (None, 19))
orig_r = TreeNode(19)
orig = TreeNode(7, TreeNode(4), TreeNode(3, None, orig_r))
clone_r = TreeNode(19)
clone = TreeNode(7, TreeNode(4), TreeNode(3, None, clone_r))

sol = Solution()
assert sol.getTargetCopy(orig, clone, orig_r) is clone_r
print("All tests passed successfully.")
