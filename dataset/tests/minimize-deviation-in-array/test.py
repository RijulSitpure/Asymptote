import heapq

class Solution:
    def minimumDeviation(self, nums: list[int]) -> int:
        pq = []
        min_val = float("inf")
        for x in nums:
            if x % 2 == 1:
                x *= 2
            pq.append(-x)
            min_val = min(min_val, x)
        heapq.heapify(pq)
        min_dev = float("inf")
        while True:
            max_val = -heapq.heappop(pq)
            min_dev = min(min_dev, max_val - min_val)
            if max_val % 2 == 1:
                break
            half = max_val // 2
            min_val = min(min_val, half)
            heapq.heappush(pq, -half)
        return min_dev

def test():
    sol = Solution()
    assert sol.minimumDeviation([1,2,3,4]) == 1
    assert sol.minimumDeviation([4,1,5,20,3]) == 3
    assert sol.minimumDeviation([2,10,8]) == 3

    print("✓ minimize-deviation-in-array passed")

if __name__ == '__main__':
    test()
