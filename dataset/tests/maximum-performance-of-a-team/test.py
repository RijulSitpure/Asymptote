import heapq

class Solution:
    def maxPerformance(self, n: int, speed: list[int], efficiency: list[int], k: int) -> int:
        engineers = sorted(zip(efficiency, speed), reverse=True)
        min_heap = []
        speed_sum = 0
        max_perf = 0
        for eff, spd in engineers:
            heapq.heappush(min_heap, spd)
            speed_sum += spd
            if len(min_heap) > k:
                speed_sum -= heapq.heappop(min_heap)
            max_perf = max(max_perf, speed_sum * eff)
        return max_perf % (10**9 + 7)

def test():
    sol = Solution()
    assert sol.maxPerformance(6, [2,10,3,1,5,8], [5,4,3,9,7,2], 2) == 60, "test 1 failed"
    assert sol.maxPerformance(6, [2,10,3,1,5,8], [5,4,3,9,7,2], 3) == 68, "test 2 failed"
    assert sol.maxPerformance(6, [2,10,3,1,5,8], [5,4,3,9,7,2], 4) == 72, "test 3 failed"
    print("✓ maximum-performance-of-a-team passed")

if __name__ == "__main__":
    test()
