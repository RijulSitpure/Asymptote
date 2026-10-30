import heapq

class Solution:
    def minStoneSum(self, piles: list[int], k: int) -> int:
        pq = [-x for x in piles]
        heapq.heapify(pq)
        
        for _ in range(k):
            top = -heapq.heappop(pq)
            reduced = top - top // 2
            heapq.heappush(pq, -reduced)
            
        return -sum(pq)

def test_min_stone_sum():
    sol = Solution()
    assert sol.minStoneSum([5, 4, 9], 2) == 12
    assert sol.minStoneSum([4, 3, 6, 7], 3) == 12

