def minMaxLightWaitTime(lights: list[list[int]], cycle: int) -> int:
    max_wait = 0
    for green_start, green_end in lights:
        # Wait time until next green phase
        red_duration = cycle - (green_end - green_start)
        max_wait = max(max_wait, red_duration)
    return max_wait