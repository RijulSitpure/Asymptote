from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        tree_sum = [0] * (4 * n)
        tree_sq = [0] * (4 * n)
        lazy = [0] * (4 * n)
        
        def apply(node, l, r, v):
            length = r - l + 1
            tree_sq[node] = (tree_sq[node] + 2 * v * tree_sum[node] + length * v * v) % MOD
            tree_sum[node] = (tree_sum[node] + length * v) % MOD
            lazy[node] = (lazy[node] + v) % MOD
            
        def push_down(node, l, r):
            if lazy[node] != 0:
                mid = (l + r) // 2
                apply(2 * node, l, mid, lazy[node])
                apply(2 * node + 1, mid + 1, r, lazy[node])
                lazy[node] = 0
                
        def update(node, l, r, ql, qr, v):
            if ql <= l and r <= qr:
                apply(node, l, r, v)
                return
            push_down(node, l, r)
            mid = (l + r) // 2
            if ql <= mid:
                update(2 * node, l, mid, ql, qr, v)
            if qr > mid:
                update(2 * node + 1, mid + 1, r, ql, qr, v)
            tree_sum[node] = (tree_sum[2 * node] + tree_sum[2 * node + 1]) % MOD
            tree_sq[node] = (tree_sq[2 * node] + tree_sq[2 * node + 1]) % MOD
            
        last_seen = {}
        total = 0
        for r, x in enumerate(nums):
            l = last_seen[x] + 1 if x in last_seen else 0
            update(1, 0, n - 1, l, r, 1)
            total = (total + tree_sq[1]) % MOD
            last_seen[x] = r
        return total
