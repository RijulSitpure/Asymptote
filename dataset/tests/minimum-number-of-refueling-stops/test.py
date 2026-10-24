from typing import List
import heapq

class Solution:
    def minRefuelStops(self, target: int, startFuel: int, stations: List[List[int]]) -> int:
        max_heap = []
        stops = 0
        cur_fuel = startFuel
        prev_pos = 0
        all_stations = stations + [[target, 0]]

        for pos, fuel in all_stations:
            cur_fuel -= (pos - prev_pos)
            while max_heap and cur_fuel < 0:
                cur_fuel += -heapq.heappop(max_heap)
                stops += 1
            if cur_fuel < 0:
                return -1
            heapq.heappush(max_heap, -fuel)
            prev_pos = pos

        return stops

def test():
    sol = Solution()
    assert sol.minRefuelStops(1, 1, []) == 0, "test 1 failed"
    assert sol.minRefuelStops(100, 1, [[10, 100]]) == -1, "test 2 failed"
    assert sol.minRefuelStops(100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]]) == 2, "test 3 failed"
    print("✓ minimum-number-of-refueling-stops passed")

if __name__ == "__main__":
    test()
