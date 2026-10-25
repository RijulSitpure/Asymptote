import heapq

class Solution:
    def furthestBuilding(self, heights: list[int], bricks: int, ladders: int) -> int:
        h_diffs = []
        for i in range(len(heights) - 1):
            diff = heights[i + 1] - heights[i]
            if diff > 0:
                heapq.heappush(h_diffs, diff)
                if len(h_diffs) > ladders:
                    bricks -= heapq.heappop(h_diffs)
                    if bricks < 0:
                        return i
        return len(heights) - 1

def test():
    sol = Solution()
    assert sol.furthestBuilding([4,2,7,6,9,14,12], 5, 1) == 4
    assert sol.furthestBuilding([4,12,2,7,3,18,20,3,19], 10, 2) == 7
    assert sol.furthestBuilding([14,3,19,3], 17, 0) == 3

    print("✓ furthest-building-you-can-reach passed")

if __name__ == '__main__':
    test()
