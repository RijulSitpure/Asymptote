class Solution:
    def getFinalState(self, nums: list[int], k: int, multiplier: int) -> list[int]:
        if multiplier == 1 or k == 0:
            return nums[:]
            
        import heapq
        mod = 10**9 + 7
        n = len(nums)
        mx = max(nums)
        
        # Min-heap of (val, idx)
        pq = [(val, idx) for idx, val in enumerate(nums)]
        heapq.heapify(pq)
        
        # Multiply until the minimum element exceeds original max or k runs out
        while k > 0 and pq[0][0] * multiplier <= mx:
            val, idx = heapq.heappop(pq)
            heapq.heappush(pq, (val * multiplier, idx))
            k -= 1
            
        if k == 0:
            res = [0] * n
            for val, idx in pq:
                res[idx] = val % mod
            return res
            
        # We need to do one full leveling pass if min * multiplier > mx, but still elements have uneven multipliers
        while k > 0 and pq[0][0] < mx:
            val, idx = heapq.heappop(pq)
            heapq.heappush(pq, (val * multiplier, idx))
            k -= 1
            
        # Now each element cycles regularly
        full_cycles = k // n
        rem = k % n
        
        # Sort heap elements to process remainder in order of smallest values
        sorted_elements = []
        while pq:
            sorted_elements.append(heapq.heappop(pq))
            
        mult_full = pow(multiplier, full_cycles, mod)
        mult_extra = (mult_full * multiplier) % mod
        
        res = [0] * n
        for i, (val, idx) in enumerate(sorted_elements):
            factor = mult_extra if i < rem else mult_full
            res[idx] = (val % mod * factor) % mod
            
        return res
