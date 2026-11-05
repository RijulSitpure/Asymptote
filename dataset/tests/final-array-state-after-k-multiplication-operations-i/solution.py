class Solution:
    def getFinalState(self, nums: list[int], k: int, multiplier: int) -> list[int]:
        import heapq
        # Min-heap of (val, idx)
        pq = [(val, idx) for idx, val in enumerate(nums)]
        heapq.heapify(pq)
        
        for _ in range(k):
            val, idx = heapq.heappop(pq)
            val *= multiplier
            heapq.heappush(pq, (val, idx))
            
        res = [0] * len(nums)
        for val, idx in pq:
            res[idx] = val
        return res
