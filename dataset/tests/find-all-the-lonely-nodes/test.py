class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getLonelyNodes(self, root: TreeNode) -> list[int]:
        ans = []
        def dfs(node):
            if not node: return
            if node.left and not node.right:
                ans.append(node.left.val)
            elif node.right and not node.left:
                ans.append(node.right.val)
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ans

sol = Solution()
r1 = TreeNode(1, TreeNode(2, None, TreeNode(4)), TreeNode(3))
assert sorted(sol.getLonelyNodes(r1)) == [4]
r2 = TreeNode(7, TreeNode(1, TreeNode(6), None), TreeNode(4, TreeNode(5), TreeNode(3, None, TreeNode(2))))
assert sorted(sol.getLonelyNodes(r2)) == [2, 6]
print("All tests passed successfully.")
