class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def correctBinaryTree(self, root: 'TreeNode') -> 'TreeNode':
        visited = set()
        def dfs(node):
            if not node:
                return None
            if node.right and node.right in visited:
                return None
            visited.add(node)
            node.right = dfs(node.right)
            node.left = dfs(node.left)
            return node
        return dfs(root)

n1 = TreeNode(1)
n2 = TreeNode(2)
n3 = TreeNode(3)
n1.left = n2
n1.right = n3
n2.right = n3  # invalid link
sol = Solution()
res = sol.correctBinaryTree(n1)
assert res.left is None
assert res.right == n3
print("All tests passed successfully.")
