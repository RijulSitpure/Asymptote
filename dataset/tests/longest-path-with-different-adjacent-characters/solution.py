from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def longestPath(self, parent: list[int], s: str) -> int:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)
        ans = 1

        def dfs(u):
            nonlocal ans
            first, second = 0, 0
            for v in children[u]:
                len_v = dfs(v)
                if s[v] != s[u]:
                    if len_v > first:
                        first, second = len_v, first
                    elif len_v > second:
                        second = len_v
            ans = max(ans, 1 + first + second)
            return 1 + first

        dfs(0)
        return ans
