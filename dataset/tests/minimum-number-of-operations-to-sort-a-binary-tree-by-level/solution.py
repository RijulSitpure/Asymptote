from collections import deque

class Solution:
    def minimumOperations(self, root) -> int:
        if not root:
            return 0
        q = deque([root])
        total_swaps = 0
        while q:
            level_vals = []
            for _ in range(len(q)):
                node = q.popleft()
                level_vals.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            n = len(level_vals)
            sorted_vals = sorted(level_vals)
            target_pos = {val: i for i, val in enumerate(sorted_vals)}
            visited = [False] * n
            for i in range(n):
                if visited[i] or target_pos[level_vals[i]] == i:
                    continue
                cycle_len = 0
                curr = i
                while not visited[curr]:
                    visited[curr] = True
                    curr = target_pos[level_vals[curr]]
                    cycle_len += 1
                if cycle_len > 1:
                    total_swaps += cycle_len - 1
        return total_swaps
