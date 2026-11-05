class RideSharingSystem:
    def __init__(self):
        self.drivers = {}
        self.active_rides = {}

    def addDriver(self, driverId: int, x: int, y: int) -> None:
        self.drivers[driverId] = (x, y)

    def requestRide(self, riderId: int, x: int, y: int) -> int:
        if not self.drivers:
            return -1
        best_d = float('inf')
        best_id = -1
        for d_id, (dx, dy) in self.drivers.items():
            dist = abs(dx - x) + abs(dy - y)
            if dist < best_d or (dist == best_d and (best_id == -1 or d_id < best_id)):
                best_d = dist
                best_id = d_id
        if best_id != -1:
            del self.drivers[best_id]
            self.active_rides[riderId] = best_id
        return best_id

    def completeRide(self, riderId: int, x: int, y: int) -> None:
        if riderId in self.active_rides:
            d_id = self.active_rides.pop(riderId)
            self.drivers[d_id] = (x, y)