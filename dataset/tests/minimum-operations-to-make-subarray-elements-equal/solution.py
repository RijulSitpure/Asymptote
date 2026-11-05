import heapq
from collections import defaultdict

class Solution:
    def minOperations(self, nums: list[int], k: int) -> int:
        small = []
        large = []
        delayed = defaultdict(int)
        
        small_size = 0
        large_size = 0
        sum_small = 0
        sum_large = 0
        target = (k + 1) // 2
        
        def prune(heap, is_small):
            while heap:
                val = -heap[0] if is_small else heap[0]
                if delayed[val] > 0:
                    delayed[val] -= 1
                    heapq.heappop(heap)
                else:
                    break
                    
        def rebalance():
            nonlocal small_size, large_size, sum_small, sum_large
            while small_size > target:
                prune(small, True)
                val = -heapq.heappop(small)
                sum_small -= val
                small_size -= 1
                heapq.heappush(large, val)
                sum_large += val
                large_size += 1
                prune(small, True)
            while small_size < target and large_size > 0:
                prune(large, False)
                val = heapq.heappop(large)
                sum_large -= val
                large_size -= 1
                heapq.heappush(small, -val)
                sum_small += val
                small_size += 1
                prune(large, False)

        def add(num):
            nonlocal small_size, large_size, sum_small, sum_large
            prune(small, True)
            if not small or num <= -small[0]:
                heapq.heappush(small, -num)
                sum_small += num
                small_size += 1
            else:
                heapq.heappush(large, num)
                sum_large += num
                large_size += 1
            rebalance()
            
        def remove(num):
            nonlocal small_size, large_size, sum_small, sum_large
            prune(small, True)
            delayed[num] += 1
            if num <= -small[0]:
                small_size -= 1
                sum_small -= num
                if num == -small[0]:
                    prune(small, True)
            else:
                large_size -= 1
                sum_large -= num
                if large and num == large[0]:
                    prune(large, False)
            rebalance()

        for i in range(k):
            add(nums[i])
            
        def get_cost():
            prune(small, True)
            prune(large, False)
            median = -small[0]
            return (median * small_size - sum_small) + (sum_large - median * large_size)

        ans = get_cost()
        for i in range(k, len(nums)):
            add(nums[i])
            remove(nums[i - k])
            ans = min(ans, get_cost())
            
        return ans
