class Solution:
    def countGreatEnoughNodes(self, root, k: int) -> int:
        ans = 0
        def dfs(node):
            nonlocal ans
            if not node:
                return []
            left_vals = dfs(node.left)
            right_vals = dfs(node.right)
            merged = sorted(left_vals + right_vals)[:k]
            if len(merged) == k and merged[-1] < node.val:
                ans += 1
            return sorted(merged + [node.val])[:k]
        dfs(root)
        return ans