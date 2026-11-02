from collections import defaultdict

class Solution:
    def countPalindromePaths(self, parent: list[int], s: str) -> int:
        n = len(parent)
        adj = defaultdict(list)
        for i in range(1, n):
            adj[parent[i]].append((i, 1 << (ord(s[i]) - ord("a"))))
        mask = [0] * n
        stack = [(0, 0)]
        while stack:
            u, m = stack.pop()
            mask[u] = m
            for v, bit in adj[u]:
                stack.append((v, m ^ bit))
        counts = defaultdict(int)
        for m in mask:
            counts[m] += 1
        ans = 0
        for m, cnt in counts.items():
            ans += cnt * (cnt - 1) // 2
            for i in range(26):
                target = m ^ (1 << i)
                if target > m and target in counts:
                    ans += cnt * counts[target]
        return ans