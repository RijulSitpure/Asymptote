class Solution:
    def numberOfPairs(self, nums1: list[int], nums2: list[int], diff: int) -> int:
        n = len(nums1)
        d = [nums1[i] - nums2[i] for i in range(n)]
        all_vals = sorted(set(d + [x + diff for x in d]))
        val_map = {val: i + 1 for i, val in enumerate(all_vals)}
        
        bit = [0] * (len(all_vals) + 2)
        def add(idx, val):
            while idx < len(bit):
                bit[idx] += val
                idx += idx & (-idx)
        def query(idx):
            s = 0
            while idx > 0:
                s += bit[idx]
                idx -= idx & (-idx)
            return s
        
        ans = 0
        for x in d:
            target = x + diff
            ans += query(val_map[target])
            add(val_map[x], 1)
        return ans
