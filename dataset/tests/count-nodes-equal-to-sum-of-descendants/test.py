class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def equalToDescendants(self, root: TreeNode | None) -> int:
        ans = 0
        def dfs(node):
            nonlocal ans
            if not node:
                return 0
            left_sum = dfs(node.left)
            right_sum = dfs(node.right)
            if node.val == left_sum + right_sum:
                ans += 1
            return left_sum + right_sum + node.val
        dfs(root)
        return ans

def test_equal_to_descendants():
    sol = Solution()
    root = TreeNode(10, TreeNode(3, TreeNode(2), TreeNode(1)), TreeNode(4, None, None))
    assert sol.equalToDescendants(root) == 2

