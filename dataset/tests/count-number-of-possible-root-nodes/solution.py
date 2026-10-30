class Solution:
    def rootCount(self, edges: list[list[int]], guesses: list[list[int]], k: int) -> int:
        from collections import defaultdict
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        guess_set = {(u, v) for u, v in guesses}
        base_matches = 0
        def dfs1(u, p):
            nonlocal base_matches
            for v in adj[u]:
                if v != p:
                    if (u, v) in guess_set:
                        base_matches += 1
                    dfs1(v, u)
        dfs1(0, -1)
        valid_roots = 0
        def dfs2(u, p, current_matches):
            nonlocal valid_roots
            if current_matches >= k:
                valid_roots += 1
            for v in adj[u]:
                if v != p:
                    next_matches = current_matches
                    if (u, v) in guess_set:
                        next_matches -= 1
                    if (v, u) in guess_set:
                        next_matches += 1
                    dfs2(v, u, next_matches)
        dfs2(0, -1, base_matches)
        return valid_roots
