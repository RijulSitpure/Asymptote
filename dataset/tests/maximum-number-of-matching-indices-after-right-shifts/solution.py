class Solution:
    def maximumMatchingIndices(self, nums1: list[int], nums2: list[int]) -> int:
        n = len(nums1)
        max_matches = 0
        for shift in range(n):
            current = 0
            for i in range(n):
                if nums1[(i - shift) % n] == nums2[i]:
                    current += 1
            if current > max_matches:
                max_matches = current
        return max_matches
