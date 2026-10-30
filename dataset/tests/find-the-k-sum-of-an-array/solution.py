import heapq

class Solution:
    def kSum(self, nums: list[int], k: int) -> int:
        max_sum = sum(x for x in nums if x > 0)
        abs_vals = sorted(abs(x) for x in nums)
        if k == 1:
            return max_sum
        
        h = [(abs_vals[0], 0)]
        for _ in range(k - 1):
            val, i = heapq.heappop(h)
            if _ == k - 2:
                return max_sum - val
            if i + 1 < len(abs_vals):
                heapq.heappush(h, (val + abs_vals[i + 1], i + 1))
                heapq.heappush(h, (val - abs_vals[i] + abs_vals[i + 1], i + 1))
        return max_sum
