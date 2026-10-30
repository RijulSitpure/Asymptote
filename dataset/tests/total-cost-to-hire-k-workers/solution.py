import heapq

class Solution:
    def totalCost(self, costs: list[int], k: int, candidates: int) -> int:
        n = len(costs)
        left = candidates
        right = max(candidates, n - candidates)
        h1 = costs[:candidates]
        h2 = costs[right:]
        heapq.heapify(h1)
        heapq.heapify(h2)
        ans = 0
        l_idx = left
        r_idx = right - 1
        for _ in range(k):
            if not h2 or (h1 and h1[0] <= h2[0]):
                ans += heapq.heappop(h1)
                if l_idx <= r_idx:
                    heapq.heappush(h1, costs[l_idx])
                    l_idx += 1
            else:
                ans += heapq.heappop(h2)
                if l_idx <= r_idx:
                    heapq.heappush(h2, costs[r_idx])
                    r_idx -= 1
        return ans
