import heapq

class Solution:
    def maxScore(self, nums1: list[int], nums2: list[int], k: int) -> int:
        pairs = sorted(zip(nums2, nums1), reverse=True)
        pq = []
        total = 0
        ans = 0
        for n2, n1 in pairs:
            heapq.heappush(pq, n1)
            total += n1
            if len(pq) > k:
                total -= heapq.heappop(pq)
            if len(pq) == k:
                ans = max(ans, total * n2)
        return ans
