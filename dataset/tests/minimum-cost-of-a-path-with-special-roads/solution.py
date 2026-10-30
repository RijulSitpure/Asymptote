class Solution:
    def minimumCost(self, start: list[int], target: list[int], specialRoads: list[list[int]]) -> int:
        import heapq
        filtered = []
        for x1, y1, x2, y2, cost in specialRoads:
            if cost < abs(x1 - x2) + abs(y1 - y2):
                filtered.append((x1, y1, x2, y2, cost))
        nodes = [(start[0], start[1]), (target[0], target[1])]
        for x1, y1, x2, y2, _ in filtered:
            nodes.append((x1, y1))
            nodes.append((x2, y2))
        nodes = list(set(nodes))
        dist = {pt: float('inf') for pt in nodes}
        start_pt = (start[0], start[1])
        target_pt = (target[0], target[1])
        dist[start_pt] = 0
        pq = [(0, start_pt[0], start_pt[1])]
        while pq:
            d, x, y = heapq.heappop(pq)
            if d > dist[(x, y)]:
                continue
            if (x, y) == target_pt:
                return d
            # Direct Manhattan to target
            d_target = d + abs(x - target_pt[0]) + abs(y - target_pt[1])
            if d_target < dist[target_pt]:
                dist[target_pt] = d_target
                heapq.heappush(pq, (d_target, target_pt[0], target_pt[1]))
            # Step through each special road
            for x1, y1, x2, y2, cost in filtered:
                d_road = d + abs(x - x1) + abs(y - y1) + cost
                if d_road < dist[(x2, y2)]:
                    dist[(x2, y2)] = d_road
                    heapq.heappush(pq, (d_road, x2, y2))
        return dist[target_pt]
