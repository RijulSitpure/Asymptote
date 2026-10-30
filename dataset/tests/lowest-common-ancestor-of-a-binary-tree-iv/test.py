class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', nodes: 'list[TreeNode]') -> 'TreeNode':
        target = set(nodes)
        def dfs(node):
            if not node or node in target:
                return node
            left = dfs(node.left)
            right = dfs(node.right)
            if left and right:
                return node
            return left if left else right
        return dfs(root)

r = TreeNode(3)
n5 = TreeNode(5)
n1 = TreeNode(1)
n6 = TreeNode(6)
n2 = TreeNode(2)
r.left = n5
r.right = n1
n5.left = n6
n5.right = n2
sol = Solution()
assert sol.lowestCommonAncestor(r, [n6, n2]) == n5
print("All tests passed successfully.")
