from collections import defaultdict, deque
from typing import List

class Solution:
    def numBusesToDestination(self, routes: List[List[int]], source: int, target: int) -> int:
        if source == target:
            return 0

        stop_to_buses = defaultdict(list)
        for b, route in enumerate(routes):
            for stop in route:
                stop_to_buses[stop].append(b)

        if source not in stop_to_buses or target not in stop_to_buses:
            return -1

        queue = deque()
        visited_buses = set()
        visited_stops = {source}

        for b in stop_to_buses[source]:
            queue.append((b, 1))
            visited_buses.add(b)

        while queue:
            b, step = queue.popleft()
            for stop in routes[b]:
                if stop == target:
                    return step
                if stop not in visited_stops:
                    visited_stops.add(stop)
                    for nxt_b in stop_to_buses[stop]:
                        if nxt_b not in visited_buses:
                            visited_buses.add(nxt_b)
                            queue.append((nxt_b, step + 1))

        return -1

def test():
    sol = Solution()
    r1 = [[1, 2, 7], [3, 6, 7]]
    assert sol.numBusesToDestination(r1, 1, 6) == 2, "test 1 failed"
    r2 = [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]]
    assert sol.numBusesToDestination(r2, 15, 12) == -1, "test 2 failed"
    print("✓ bus-routes passed")

if __name__ == "__main__":
    test()
