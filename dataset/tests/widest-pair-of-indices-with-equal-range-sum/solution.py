class Solution:
    def widestPairOfIndices(self, nums1: list[int], nums2: list[int]) -> int:
        seen = {0: -1}
        curr = 0
        max_width = 0
        for i in range(len(nums1)):
            curr += nums1[i] - nums2[i]
            if curr in seen:
                max_width = max(max_width, i - seen[curr])
            else:
                seen[curr] = i
        return max_width
