class UndergroundSystem:
    def __init__(self):
        self.check_ins = {}
        self.routes = {}

    def checkIn(self, id: int, stationName: str, t: int) -> None:
        self.check_ins[id] = (stationName, t)

    def checkOut(self, id: int, stationName: str, t: int) -> None:
        start_station, t_in = self.check_ins.pop(id)
        route = (start_station, stationName)
        total_time, count = self.routes.get(route, (0, 0))
        self.routes[route] = (total_time + (t - t_in), count + 1)

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        total_time, count = self.routes[(startStation, endStation)]
        return total_time / count

sys = UndergroundSystem()
sys.checkIn(45, "Leyton", 3)
sys.checkIn(32, "Paradise", 8)
sys.checkIn(27, "Leyton", 10)
sys.checkOut(45, "Waterloo", 15)
sys.checkOut(27, "Waterloo", 20)
sys.checkOut(32, "Cambridge", 22)
assert abs(sys.getAverageTime("Paradise", "Cambridge") - 14.0) < 1e-5
assert abs(sys.getAverageTime("Leyton", "Waterloo") - 11.0) < 1e-5
print("All tests passed successfully.")
