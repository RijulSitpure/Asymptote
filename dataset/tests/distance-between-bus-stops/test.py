class Solution:
    def distanceBetweenBusStops(self, distance: list[int], start: int, destination: int) -> int:
        if start > destination:
            start, destination = destination, start
        clockwise = sum(distance[start:destination])
        total = sum(distance)
        return min(clockwise, total - clockwise)

def test():
    sol = Solution()
    assert sol.distanceBetweenBusStops([1,2,3,4], 0, 1) == 1, "test 1 failed"
    assert sol.distanceBetweenBusStops([1,2,3,4], 0, 2) == 3, "test 2 failed"
    assert sol.distanceBetweenBusStops([1,2,3,4], 0, 3) == 4, "test 3 failed"
    print("✓ distance-between-bus-stops passed")

if __name__ == "__main__":
    test()
