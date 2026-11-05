from collections import deque
from typing import Optional

class Solution:
    def minimumLevel(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        q = deque([root])
        level = 1
        min_sum = float('inf')
        ans_level = 1
        while q:
            sz = len(q)
            cur_sum = 0
            for _ in range(sz):
                node = q.popleft()
                cur_sum += node.val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            if cur_sum < min_sum:
                min_sum = cur_sum
                ans_level = level
            level += 1
        return ans_level