from typing import List

class Solution:
    def goodTriplets(self, nums1: List[int], nums2: List[int]) -> int:
        n = len(nums1)
        pos2 = {val: i for i, val in enumerate(nums2)}
        A = [pos2[x] for x in nums1]
        
        bit = [0] * (n + 1)
        def add(idx, val):
            idx += 1
            while idx <= n:
                bit[idx] += val
                idx += idx & -idx
        def query(idx):
            idx += 1
            s = 0
            while idx > 0:
                s += bit[idx]
                idx -= idx & -idx
            return s
            
        ans = 0
        for j, y in enumerate(A):
            left_smaller = query(y - 1)
            right_greater = (n - 1 - y) - (j - left_smaller)
            ans += left_smaller * right_greater
            add(y, 1)
        return ans
