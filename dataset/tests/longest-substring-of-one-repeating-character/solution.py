from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def longestRepeating(self, s: str, queryCharacters: str, queryIndices: list[int]) -> list[int]:
        n = len(s)
        tree = [None] * (4 * n)

        def merge(l, r):
            t_len = l[0] + r[0]
            pre_c, pre_l = l[1], l[2]
            if l[2] == l[0] and l[1] == r[1]:
                pre_l += r[2]
            suf_c, suf_l = r[3], r[4]
            if r[4] == r[0] and r[3] == l[3]:
                suf_l += l[4]
            mx = max(l[5], r[5])
            if l[3] == r[1]:
                mx = max(mx, l[4] + r[2])
            return (t_len, pre_c, pre_l, suf_c, suf_l, mx)

        def build(node, l, r):
            if l == r:
                c = s[l]
                tree[node] = (1, c, 1, c, 1, 1)
                return
            mid = (l + r) // 2
            build(2 * node, l, mid)
            build(2 * node + 1, mid + 1, r)
            tree[node] = merge(tree[2 * node], tree[2 * node + 1])

        def update(node, l, r, idx, ch):
            if l == r:
                tree[node] = (1, ch, 1, ch, 1, 1)
                return
            mid = (l + r) // 2
            if idx <= mid:
                update(2 * node, l, mid, idx, ch)
            else:
                update(2 * node + 1, mid + 1, r, idx, ch)
            tree[node] = merge(tree[2 * node], tree[2 * node + 1])

        build(1, 0, n - 1)
        ans = []
        for ch, idx in zip(queryCharacters, queryIndices):
            update(1, 0, n - 1, idx, ch)
            ans.append(tree[1][5])
        return ans
