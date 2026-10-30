class Solution:
    def latestTimeCatchBus(self, buses: list[int], passengers: list[int], capacity: int) -> int:
        buses.sort()
        passengers.sort()
        j = 0
        m = len(passengers)
        for bus in buses:
            cap = capacity
            while cap > 0 and j < m and passengers[j] <= bus:
                j += 1
                cap -= 1
        last_time = buses[-1] if cap > 0 else passengers[j - 1]
        pset = set(passengers)
        while last_time in pset:
            last_time -= 1
        return last_time
