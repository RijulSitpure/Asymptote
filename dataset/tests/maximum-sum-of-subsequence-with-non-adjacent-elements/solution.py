class Solution:
    def maximumSumSubsequence(self, nums: list[int], queries: list[list[int]]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        tree = [[0] * 4 for _ in range(4 * n)]
        
        def pull(node):
            lc, rc = 2 * node, 2 * node + 1
            tree[node][0] = max(tree[lc][0] + tree[rc][2], tree[lc][1] + tree[rc][0])
            tree[node][1] = max(tree[lc][0] + tree[rc][3], tree[lc][1] + tree[rc][1])
            tree[node][2] = max(tree[lc][2] + tree[rc][2], tree[lc][3] + tree[rc][0])
            tree[node][3] = max(tree[lc][2] + tree[rc][3], tree[lc][3] + tree[rc][1])
        
        def build(node, l, r):
            if l == r:
                v = max(0, nums[l])
                tree[node] = [0, 0, 0, v]
                return
            mid = (l + r) // 2
            build(2 * node, l, mid)
            build(2 * node + 1, mid + 1, r)
            pull(node)
        
        def update(node, l, r, idx, val):
            if l == r:
                v = max(0, val)
                tree[node] = [0, 0, 0, v]
                return
            mid = (l + r) // 2
            if idx <= mid:
                update(2 * node, l, mid, idx, val)
            else:
                update(2 * node + 1, mid + 1, r, idx, val)
            pull(node)
        
        build(1, 0, n - 1)
        ans = 0
        for pos, x in queries:
            update(1, 0, n - 1, pos, x)
            ans = (ans + tree[1][3]) % MOD
        return ans