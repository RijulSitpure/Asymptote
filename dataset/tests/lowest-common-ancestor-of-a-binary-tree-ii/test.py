class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        count = 0
        def dfs(node):
            nonlocal count
            if not node:
                return None
            left = dfs(node.left)
            right = dfs(node.right)
            mid = False
            if node == p or node == q:
                count += 1
                mid = True
            if (left and right) or (mid and (left or right)):
                return node
            if mid:
                return node
            return left if left else right
        ans = dfs(root)
        return ans if count == 2 else None

r = TreeNode(3)
p = TreeNode(5)
q = TreeNode(1)
r.left = p
r.right = q
sol = Solution()
assert sol.lowestCommonAncestor(r, p, q) == r
missing = TreeNode(10)
assert sol.lowestCommonAncestor(r, p, missing) is None
print("All tests passed successfully.")
