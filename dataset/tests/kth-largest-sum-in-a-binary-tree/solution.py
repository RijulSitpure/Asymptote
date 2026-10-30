class Solution:
    def kthLargestLevelSum(self, root, k: int) -> int:
        from collections import deque
        if not root:
            return -1
        q = deque([root])
        level_sums = []
        while q:
            level_sum = 0
            for _ in range(len(q)):
                node = q.popleft()
                level_sum += node.val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            level_sums.append(level_sum)
        if len(level_sums) < k:
            return -1
        level_sums.sort(reverse=True)
        return level_sums[k - 1]
