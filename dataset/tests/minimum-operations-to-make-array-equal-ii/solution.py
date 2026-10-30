class Solution:
    def minOperations(self, nums1: list[int], nums2: list[int], k: int) -> int:
        if k == 0:
            return 0 if nums1 == nums2 else -1
        pos = 0
        neg = 0
        for a, b in zip(nums1, nums2):
            diff = a - b
            if diff % k != 0:
                return -1
            if diff > 0:
                pos += diff // k
            elif diff < 0:
                neg += (-diff) // k
        return pos if pos == neg else -1
