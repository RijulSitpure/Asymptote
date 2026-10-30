class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def averageOfSubtree(self, root) -> int:
        ans = 0
        def dfs(node):
            nonlocal ans
            if not node:
                return 0, 0
            l_sum, l_cnt = dfs(node.left)
            r_sum, r_cnt = dfs(node.right)
            s = l_sum + r_sum + node.val
            c = l_cnt + r_cnt + 1
            if s // c == node.val:
                ans += 1
            return s, c
        dfs(root)
        return ans
