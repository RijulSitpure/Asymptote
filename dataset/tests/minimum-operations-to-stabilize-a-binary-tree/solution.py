class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def minOperationsToStabilize(root: TreeNode) -> int:
    ops = 0

    def dfs(node: TreeNode) -> int:
        nonlocal ops
        if not node:
            return 0
        if not node.left and not node.right:
            return node.val

        l_val = dfs(node.left)
        r_val = dfs(node.right)
        child_sum = l_val + r_val

        ops += abs(node.val - child_sum)
        return child_sum

    dfs(root)
    return ops