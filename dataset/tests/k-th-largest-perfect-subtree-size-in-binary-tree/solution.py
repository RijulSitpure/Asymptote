# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthLargestPerfectSubtree(self, root: 'TreeNode', k: int) -> int:
        perfect_sizes = []
        
        # Returns height of perfect subtree rooted at node, or -1 if not perfect
        def dfs(node):
            if not node:
                return 0
            lh = dfs(node.left)
            rh = dfs(node.right)
            if lh != -1 and rh != -1 and lh == rh:
                h = lh + 1
                perfect_sizes.append((1 << h) - 1)
                return h
            return -1
            
        dfs(root)
        perfect_sizes.sort(reverse=True)
        if len(perfect_sizes) < k:
            return -1
        return perfect_sizes[k - 1]
