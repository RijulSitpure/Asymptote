def maxStationGap(stations: list[int]) -> int:
    if len(stations) < 2:
        return 0
    stations.sort()
    return max(stations[i] - stations[i - 1] for i in range(1, len(stations)))