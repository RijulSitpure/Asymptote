import heapq

class Solution:
    def convertArray(self, nums: list[int]) -> int:
        def solve(arr: list[int]) -> int:
            h = []
            cost = 0
            for x in arr:
                if h and -h[0] > x:
                    cost += (-h[0] - x)
                    heapq.heappop(h)
                    heapq.heappush(h, -x)
                heapq.heappush(h, -x)
            return cost
        return min(solve(nums), solve(nums[::-1]))
