def minIntervalsToCover(clips: list[list[int]], target_start: int, target_end: int) -> int:
    clips.sort(key=lambda x: (x[0], -x[1]))
    count = 0
    curr_end = target_start
    farthest = target_start
    i = 0
    n = len(clips)

    while curr_end < target_end:
        while i < n and clips[i][0] <= curr_end:
            farthest = max(farthest, clips[i][1])
            i += 1

        if farthest == curr_end:
            return -1  # Cannot advance

        curr_end = farthest
        count += 1

    return count