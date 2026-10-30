import heapq

class Solution:
    def maxKelements(self, nums: list[int], k: int) -> int:
        pq = [-x for x in nums]
        heapq.heapify(pq)
        score = 0
        for _ in range(k):
            x = -heapq.heappop(pq)
            score += x
            heapq.heappush(pq, -((x + 2) // 3))
        return score
