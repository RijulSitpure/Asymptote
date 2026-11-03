class Solution:
    def maximumSubtreeSize(self, edges: list[list[int]], colors: list[int]) -> int:
        from collections import defaultdict
        g = defaultdict(list)
        for u, v in edges:
            g[u].append(v)
            g[v].append(u)
        ans = 0
        def dfs(node: int, parent: int) -> tuple[bool, int]:
            nonlocal ans
            is_same = True
            size = 1
            for neighbor in g[node]:
                if neighbor != parent:
                    child_same, child_size = dfs(neighbor, node)
                    if not child_same or colors[neighbor] != colors[node]:
                        is_same = False
                    size += child_size
            if is_same:
                ans = max(ans, size)
            return is_same, size
        dfs(0, -1)
        return ans
