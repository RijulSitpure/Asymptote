class Solution:
    def unmarkedSumArray(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        import heapq
        n = len(nums)
        marked = [False] * n
        total = sum(nums)
        heap = [(nums[i], i) for i in range(n)]
        heapq.heapify(heap)
        ans = []
        for idx, k in queries:
            if not marked[idx]:
                marked[idx] = True
                total -= nums[idx]
            while k > 0 and heap:
                val, i = heapq.heappop(heap)
                if not marked[i]:
                    marked[i] = True
                    total -= val
                    k -= 1
            ans.append(total)
        return ans
