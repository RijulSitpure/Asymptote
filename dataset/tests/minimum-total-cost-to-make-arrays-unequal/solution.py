from collections import Counter

class Solution:
    def minimumTotalCost(self, nums1: list[int], nums2: list[int]) -> int:
        ans = 0
        conflicts = 0
        freq = Counter()
        n = len(nums1)
        for i in range(n):
            if nums1[i] == nums2[i]:
                freq[nums1[i]] += 1
                conflicts += 1
                ans += i
        if conflicts == 0:
            return 0
        mode, max_f = freq.most_common(1)[0]
        needed = 2 * max_f - conflicts
        if needed <= 0:
            return ans
        for i in range(n):
            if nums1[i] != nums2[i] and nums1[i] != mode and nums2[i] != mode:
                ans += i
                needed -= 1
                if needed == 0:
                    return ans
        return -1
