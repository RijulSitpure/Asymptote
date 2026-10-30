class Solution:
    def lengthOfLIS(self, nums: list[int], k: int) -> int:
        max_v = max(nums)
        tree = [0] * (4 * (max_v + 1))
        
        def query(node, l, r, ql, qr):
            if ql <= l and r <= qr:
                return tree[node]
            mid = (l + r) // 2
            res = 0
            if ql <= mid:
                res = max(res, query(2 * node, l, mid, ql, qr))
            if qr > mid:
                res = max(res, query(2 * node + 1, mid + 1, r, ql, qr))
            return res
        
        def update(node, l, r, idx, val):
            if l == r:
                tree[node] = max(tree[node], val)
                return
            mid = (l + r) // 2
            if idx <= mid:
                update(2 * node, l, mid, idx, val)
            else:
                update(2 * node + 1, mid + 1, r, idx, val)
            tree[node] = max(tree[2 * node], tree[2 * node + 1])
        
        ans = 0
        for x in nums:
            left_bound = max(1, x - k)
            right_bound = x - 1
            best = 0
            if left_bound <= right_bound:
                best = query(1, 1, max_v, left_bound, right_bound)
            cur = best + 1
            update(1, 1, max_v, x, cur)
            ans = max(ans, cur)
        return ans
