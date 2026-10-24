import heapq

class Solution:
    def connectSticks(self, sticks: list[int]) -> int:
        heapq.heapify(sticks)
        total_cost = 0
        while len(sticks) > 1:
            first = heapq.heappop(sticks)
            second = heapq.heappop(sticks)
            cost = first + second
            total_cost += cost
            heapq.heappush(sticks, cost)
        return total_cost

def test():
    sol = Solution()
    assert sol.connectSticks([2, 4, 3]) == 14, "test 1 failed"
    assert sol.connectSticks([1, 8, 3, 5]) == 30, "test 2 failed"
    print("✓ minimum-cost-to-connect-sticks passed")

if __name__ == "__main__":
    test()
