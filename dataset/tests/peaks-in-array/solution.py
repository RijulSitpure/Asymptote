class FenwickTree:
    def __init__(self, size):
        self.tree = [0] * (size + 1)
        self.n = size
        
    def add(self, idx, val):
        idx += 1
        while idx <= self.n:
            self.tree[idx] += val
            idx += idx & (-idx)
            
    def query(self, idx):
        idx += 1
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= idx & (-idx)
        return res
        
    def range_query(self, l, r):
        if l > r:
            return 0
        return self.query(r) - self.query(l - 1)

class Solution:
    def countOfPeaks(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        n = len(nums)
        bit = FenwickTree(n)
        
        def is_peak(i):
            return 1 if 0 < i < n - 1 and nums[i] > nums[i - 1] and nums[i] > nums[i + 1] else 0
            
        peak_status = [is_peak(i) for i in range(n)]
        for i in range(n):
            if peak_status[i]:
                bit.add(i, 1)
                
        ans = []
        for q in queries:
            if q[0] == 1:
                _, l, r = q
                ans.append(bit.range_query(l + 1, r - 1))
            else:
                _, idx, val = q
                nums[idx] = val
                for i in [idx - 1, idx, idx + 1]:
                    if 0 <= i < n:
                        new_status = is_peak(i)
                        if new_status != peak_status[i]:
                            bit.add(i, new_status - peak_status[i])
                            peak_status[i] = new_status
        return ans