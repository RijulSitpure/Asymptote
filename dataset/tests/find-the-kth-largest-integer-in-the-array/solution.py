class Solution:
    def kthLargestNumber(self, nums: list[str], k: int) -> str:
        nums.sort(key=lambda s: (len(s), s), reverse=True)
        return nums[k - 1]
