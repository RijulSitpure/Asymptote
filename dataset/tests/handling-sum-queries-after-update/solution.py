class Solution:
    def handleQuery(self, nums1: list[int], nums2: list[int], queries: list[list[int]]) -> list[int]:
        n = len(nums1)
        tree = [0] * (4 * n)
        lazy = [False] * (4 * n)
        def build(node, l, r):
            if l == r:
                tree[node] = nums1[l]
                return
            mid = (l + r) // 2
            build(2 * node, l, mid)
            build(2 * node + 1, mid + 1, r)
            tree[node] = tree[2 * node] + tree[2 * node + 1]
        def update(node, l, r, ql, qr):
            if ql <= l and r <= qr:
                tree[node] = (r - l + 1) - tree[node]
                lazy[node] = not lazy[node]
                return
            mid = (l + r) // 2
            if lazy[node]:
                lazy[node] = False
                tree[2 * node] = (mid - l + 1) - tree[2 * node]
                lazy[2 * node] = not lazy[2 * node]
                tree[2 * node + 1] = (r - mid) - tree[2 * node + 1]
                lazy[2 * node + 1] = not lazy[2 * node + 1]
            if ql <= mid:
                update(2 * node, l, mid, ql, qr)
            if qr > mid:
                update(2 * node + 1, mid + 1, r, ql, qr)
            tree[node] = tree[2 * node] + tree[2 * node + 1]
        build(1, 0, n - 1)
        total_sum = sum(nums2)
        ans = []
        for q in queries:
            if q[0] == 1:
                update(1, 0, n - 1, q[1], q[2])
            elif q[0] == 2:
                total_sum += tree[1] * q[1]
            else:
                ans.append(total_sum)
        return ans
