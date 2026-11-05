class Solution:
    def minOperations(self, nums: list[int], k: int) -> int:
        import heapq
        heapq.heapify(nums)
        ops = 0
        while len(nums) >= 2 and nums[0] < k:
            x = heapq.heappop(nums)
            y = heapq.heappop(nums)
            heapq.heappush(nums, x * 2 + y)
            ops += 1
        return ops
