import heapq

class Solution:
    def maxRemoval(self, nums: list[int], queries: list[list[int]]) -> int:
        n = len(nums)
        queries.sort(key=lambda q: q[0])
        
        available = []
        diff = [0] * (n + 1)
        curr_coverage = 0
        q_idx = 0
        used = 0
        
        for i in range(n):
            curr_coverage += diff[i]
            while q_idx < len(queries) and queries[q_idx][0] == i:
                heapq.heappush(available, -queries[q_idx][1])
                q_idx += 1
            
            while curr_coverage < nums[i]:
                if not available or -available[0] < i:
                    return -1
                r = -heapq.heappop(available)
                curr_coverage += 1
                diff[r + 1] -= 1
                used += 1
                
        return len(queries) - used
