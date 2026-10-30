class Solution:
    def replaceValueInTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        from collections import deque
        if not root:
            return None
        root.val = 0
        q = deque([root])
        while q:
            level_nodes = list(q)
            q.clear()
            next_level_sum = 0
            for node in level_nodes:
                if node.left:
                    next_level_sum += node.left.val
                if node.right:
                    next_level_sum += node.right.val
            for node in level_nodes:
                sibling_sum = 0
                if node.left:
                    sibling_sum += node.left.val
                if node.right:
                    sibling_sum += node.right.val
                if node.left:
                    node.left.val = next_level_sum - sibling_sum
                    q.append(node.left)
                if node.right:
                    node.right.val = next_level_sum - sibling_sum
                    q.append(node.right)
        return root
