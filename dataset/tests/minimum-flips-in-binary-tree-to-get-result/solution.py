class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def minimumFlips(self, root, result: bool) -> int:
        def dfs(node):
            if not node:
                return 0, 0
            if node.val in (0, 1):
                return (0, 1) if node.val == 0 else (1, 0)
            
            l_f, l_t = dfs(node.left)
            r_f, r_t = dfs(node.right)
            
            if node.val == 2:  # OR
                c_false = l_f + r_f
                c_true = min(l_t + r_t, l_t + r_f, l_f + r_t)
                return c_false, c_true
            elif node.val == 3:  # AND
                c_false = min(l_f + r_f, l_f + r_t, l_t + r_f)
                c_true = l_t + r_t
                return c_false, c_true
            elif node.val == 4:  # XOR
                c_false = min(l_f + r_f, l_t + r_t)
                c_true = min(l_f + r_t, l_t + r_f)
                return c_false, c_true
            elif node.val == 5:  # NOT
                child_f, child_t = (l_f, l_t) if node.left else (r_f, r_t)
                return child_t, child_f
            return float("inf"), float("inf")
            
        c_f, c_t = dfs(root)
        return c_t if result else c_f
