class Solution:
    def minimumAddedInteger(self, nums1: list[int], nums2: list[int]) -> int:
        nums1.sort()
        nums2.sort()

        candidates = [nums2[0] - nums1[0], nums2[0] - nums1[1], nums2[0] - nums1[2]]
        candidates.sort()

        for diff in candidates:
            # Check if nums2 can be formed by adding diff to a subsequence of nums1
            p1 = 0
            p2 = 0
            while p1 < len(nums1) and p2 < len(nums2):
                if nums1[p1] + diff == nums2[p2]:
                    p2 += 1
                p1 += 1
            if p2 == len(nums2):
                return diff
        return candidates[0]
