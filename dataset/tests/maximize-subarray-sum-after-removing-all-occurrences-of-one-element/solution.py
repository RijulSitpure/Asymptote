class SegmentTree:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [None] * (4 * self.n)
        self.build(nums, 0, 0, self.n - 1)
        
    def merge(self, left, right):
        if not left: return right
        if not right: return left
        tot_sum = left[0] + right[0]
        pref = max(left[1], left[0] + right[1])
        suff = max(right[2], right[0] + left[2])
        max_sub = max(left[3], right[3], left[2] + right[1])
        return (tot_sum, pref, suff, max_sub)
        
    def build(self, nums, node, l, r):
        if l == r:
            v = nums[l]
            self.tree[node] = (v, max(0, v), max(0, v), v)
            return
        mid = (l + r) // 2
        self.build(nums, 2 * node + 1, l, mid)
        self.build(nums, 2 * node + 2, mid + 1, r)
        self.tree[node] = self.merge(self.tree[2 * node + 1], self.tree[2 * node + 2])
        
    def update(self, node, l, r, idx, val):
        if l == r:
            self.tree[node] = (val, max(0, val), max(0, val), val)
            return
        mid = (l + r) // 2
        if idx <= mid:
            self.update(2 * node + 1, l, mid, idx, val)
        else:
            self.update(2 * node + 2, mid + 1, r, idx, val)
        self.tree[node] = self.merge(self.tree[2 * node + 1], self.tree[2 * node + 2])

class Solution:
    def maxSubarraySum(self, nums: list[int]) -> int:
        if max(nums) < 0:
            return max(nums)
            
        from collections import defaultdict
        val_indices = defaultdict(list)
        for i, v in enumerate(nums):
            val_indices[v].append(i)
            
        st = SegmentTree(nums)
        ans = st.tree[0][3]
        
        for v, indices in val_indices.items():
            if v < 0:
                for idx in indices:
                    st.update(0, 0, len(nums) - 1, idx, 0)
                ans = max(ans, st.tree[0][3])
                for idx in indices:
                    st.update(0, 0, len(nums) - 1, idx, v)
                    
        return ans
