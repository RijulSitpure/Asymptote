from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def countPaths(self, n: int, edges: List[List[int]]) -> int:
        is_prime = [True] * (n + 1)
        is_prime[0] = is_prime[1] = False
        for p in range(2, int(n**0.5) + 1):
            if is_prime[p]:
                for i in range(p * p, n + 1, p):
                    is_prime[i] = False
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        comp_size = [0] * (n + 1)
        comp_id = [0] * (n + 1)
        cid = 1
        for i in range(1, n + 1):
            if not is_prime[i] and comp_id[i] == 0:
                nodes = []
                q = [i]
                comp_id[i] = cid
                while q:
                    u = q.pop()
                    nodes.append(u)
                    for v in adj[u]:
                        if not is_prime[v] and comp_id[v] == 0:
                            comp_id[v] = cid
                            q.append(v)
                sz = len(nodes)
                for u in nodes:
                    comp_size[u] = sz
                cid += 1
        ans = 0
        for p in range(1, n + 1):
            if is_prime[p]:
                seen_comps = set()
                sizes = []
                for v in adj[p]:
                    if not is_prime[v]:
                        c = comp_id[v]
                        if c not in seen_comps:
                            seen_comps.add(c)
                            sizes.append(comp_size[v])
                total_nodes = sum(sizes)
                ans += total_nodes
                pair_sum = 0
                pref = 0
                for s in sizes:
                    pair_sum += pref * s
                    pref += s
                ans += pair_sum
        return ans
