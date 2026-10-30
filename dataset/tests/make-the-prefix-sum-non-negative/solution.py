class Solution:
    def makePrefSumNonNegative(self, nums: list[int]) -> int:
        import heapq
        pq = []
        running = 0
        ops = 0
        for x in nums:
            running += x
            if x < 0:
                heapq.heappush(pq, x)
            if running < 0:
                running -= heapq.heappop(pq)
                ops += 1
        return ops
