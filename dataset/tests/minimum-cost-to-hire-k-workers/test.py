from typing import List
import heapq

class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], k: int) -> float:
        workers = sorted([(w / q, q) for w, q in zip(wage, quality)])
        max_heap = []
        sum_quality = 0
        min_cost = float('inf')

        for ratio, q in workers:
            heapq.heappush(max_heap, -q)
            sum_quality += q
            if len(max_heap) > k:
                sum_quality += heapq.heappop(max_heap)
            if len(max_heap) == k:
                min_cost = min(min_cost, ratio * sum_quality)

        return min_cost

def test():
    sol = Solution()
    res1 = sol.mincostToHireWorkers([10, 20, 5], [70, 50, 30], 2)
    assert abs(res1 - 105.0) < 1e-4, f"test 1 failed: {res1}"
    res2 = sol.mincostToHireWorkers([3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3)
    assert abs(res2 - 30.66666) < 1e-4, f"test 2 failed: {res2}"
    print("✓ minimum-cost-to-hire-k-workers passed")

if __name__ == "__main__":
    test()
