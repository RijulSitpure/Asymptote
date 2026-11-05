def minLightsToIlluminateRoad(road_length: int, lights: list[list[int]]) -> int:
    lights.sort()
    count = 0
    cur_end = 0
    max_reach = 0
    i = 0
    n = len(lights)
    while cur_end < road_length:
        advanced = False
        while i < n and lights[i][0] <= cur_end:
            max_reach = max(max_reach, lights[i][1])
            i += 1
            advanced = True
        if max_reach <= cur_end:
            return -1
        cur_end = max_reach
        count += 1
    return count