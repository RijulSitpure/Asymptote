class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidSequence(self, root: TreeNode, arr: list[int]) -> bool:
        n = len(arr)
        def dfs(node, idx):
            if not node or idx >= n or node.val != arr[idx]:
                return False
            if idx == n - 1:
                return not node.left and not node.right
            return dfs(node.left, idx + 1) or dfs(node.right, idx + 1)
        return dfs(root, 0)

sol = Solution()
r1 = TreeNode(0, TreeNode(1, TreeNode(0, None, TreeNode(1)), TreeNode(1, TreeNode(0), TreeNode(0))), TreeNode(0, TreeNode(0)))
assert sol.isValidSequence(r1, [0,1,0,1]) == True
assert sol.isValidSequence(r1, [0,0,1]) == False
assert sol.isValidSequence(r1, [0,1,1]) == False
print("All tests passed successfully.")
