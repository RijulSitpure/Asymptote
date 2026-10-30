import heapq

class Solution:
    def kBigIndices(self, nums: list[int], k: int) -> int:
        n = len(nums)
        left_ok = [False] * n
        right_ok = [False] * n
        pq = []
        for i in range(n):
            if len(pq) == k and -pq[0] < nums[i]:
                left_ok[i] = True
            heapq.heappush(pq, -nums[i])
            if len(pq) > k:
                heapq.heappop(pq)
        pq = []
        for i in range(n - 1, -1, -1):
            if len(pq) == k and -pq[0] < nums[i]:
                right_ok[i] = True
            heapq.heappush(pq, -nums[i])
            if len(pq) > k:
                heapq.heappop(pq)
        return sum(1 for i in range(n) if left_ok[i] and right_ok[i])
