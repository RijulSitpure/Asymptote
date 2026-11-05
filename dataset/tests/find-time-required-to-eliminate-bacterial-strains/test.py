import heapq

class Solution:
    def minEliminationTime(self, timeReq: list[int], splitTime: int) -> int:
        heap = timeReq.copy()
        heapq.heapify(heap)
        while len(heap) > 1:
            a = heapq.heappop(heap)
            b = heapq.heappop(heap)
            merged = splitTime + max(a, b)
            heapq.heappush(heap, merged)
        return heap[0]

def run_tests():
    s = Solution()
    assert s.minEliminationTime([2, 4, 5], 1) == 6
    assert s.minEliminationTime([3], 5) == 3
    print("All tests passed for find-time-required-to-eliminate-bacterial-strains")

if __name__ == '__main__':
    run_tests()
