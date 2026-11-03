class Solution:
    def maximumSetSize(self, nums1: list[int], nums2: list[int]) -> int:
        n = len(nums1)
        s1 = set(nums1)
        s2 = set(nums2)
        common = s1 & s2
        u1 = len(s1 - common)
        u2 = len(s2 - common)
        take1 = min(u1, n // 2)
        take2 = min(u2, n // 2)
        rem1 = n // 2 - take1
        rem2 = n // 2 - take2
        take_common = min(len(common), rem1 + rem2)
        return take1 + take2 + take_common
