def minGenerations(points: list[list[int]], target: list[int]) -> int:
    target_tuple = tuple(target)
    current_set = set(tuple(p) for p in points)
    if target_tuple in current_set:
        return 0
    all_points = list(current_set)
    for gen in range(1, 10):
        new_set = set()
        m = len(all_points)
        for i in range(m):
            p1 = all_points[i]
            for j in range(i + 1, m):
                p2 = all_points[j]
                mid = ((p1[0] + p2[0]) // 2, (p1[1] + p2[1]) // 2, (p1[2] + p2[2]) // 2)
                if mid == target_tuple:
                    return gen
                if mid not in current_set:
                    new_set.add(mid)
        if not new_set:
            break
        current_set.update(new_set)
        all_points.extend(new_set)
    return -1