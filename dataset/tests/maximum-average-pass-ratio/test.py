import heapq

class Solution:
    def maxAverageRatio(self, classes: list[list[int]], extraStudents: int) -> float:
        def gain(p: int, t: int) -> float:
            return (p + 1) / (t + 1) - p / t

        heap = [(-gain(p, t), p, t) for p, t in classes]
        heapq.heapify(heap)

        for _ in range(extraStudents):
            _, p, t = heapq.heappop(heap)
            p += 1
            t += 1
            heapq.heappush(heap, (-gain(p, t), p, t))

        total_ratio = sum(p / t for _, p, t in heap)
        return total_ratio / len(classes)

def test():
    sol = Solution()
    res1 = sol.maxAverageRatio([[1,2],[3,5],[2,2]], 2)
    assert abs(res1 - 0.78333) < 1e-4
    res2 = sol.maxAverageRatio([[2,4],[3,9],[4,5],[2,10]], 4)
    assert abs(res2 - 0.53485) < 1e-4

    print("✓ maximum-average-pass-ratio passed")

if __name__ == '__main__':
    test()
