class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findDistance(self, root: 'TreeNode', p: int, q: int) -> int:
        if p == q:
            return 0
        def lca(node):
            if not node or node.val == p or node.val == q:
                return node
            left = lca(node.left)
            right = lca(node.right)
            if left and right:
                return node
            return left if left else right
        common = lca(root)
        def dist(node, target, d):
            if not node:
                return -1
            if node.val == target:
                return d
            left = dist(node.left, target, d + 1)
            if left != -1:
                return left
            return dist(node.right, target, d + 1)
        return dist(common, p, 0) + dist(common, q, 0)

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
assert sol.findDistance(r, 5, 0) == -1 or sol.findDistance(r, 5, 1) == 2
assert sol.findDistance(r, 5, 5) == 0
assert sol.findDistance(r, 6, 2) == 2
print("All tests passed successfully.")
