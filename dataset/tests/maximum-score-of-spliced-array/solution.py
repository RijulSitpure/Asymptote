class Solution:
    def maximumsSplicedArray(self, nums1: list[int], nums2: list[int]) -> int:
        def kadane(a, b):
            max_gain = cur = 0
            for x, y in zip(a, b):
                cur = max(0, cur + y - x)
                max_gain = max(max_gain, cur)
            return sum(a) + max_gain
        return max(kadane(nums1, nums2), kadane(nums2, nums1))
