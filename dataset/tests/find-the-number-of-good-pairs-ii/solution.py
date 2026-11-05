from collections import Counter

class Solution:
    def numberOfPairs(self, nums1: list[int], nums2: list[int], k: int) -> int:
        cnt1 = Counter(nums1)
        cnt2 = Counter(nums2)
        max_val = max(nums1)
        ans = 0
        for val, c2 in cnt2.items():
            step = val * k
            for m in range(step, max_val + 1, step):
                if m in cnt1:
                    ans += c2 * cnt1[m]
        return ans