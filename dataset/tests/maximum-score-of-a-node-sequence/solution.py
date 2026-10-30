from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumScore(self, scores: list[int], edges: list[list[int]]) -> int:
        n = len(scores)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        top3 = []
        for i in range(n):
            top3.append(sorted(adj[i], key=lambda x: scores[x], reverse=True)[:3])
        ans = -1
        for u, v in edges:
            for a in top3[u]:
                for b in top3[v]:
                    if a != v and b != u and a != b:
                        score = scores[a] + scores[u] + scores[v] + scores[b]
                        if score > ans:
                            ans = score
        return ans
