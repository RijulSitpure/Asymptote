def aggregateTimeSeries(series1: list[list[int]], series2: list[list[int]]) -> list[list[int]]:
    i = 0
    j = 0
    m, n = len(series1), len(series2)
    res = []
    while i < m and j < n:
        t1, v1 = series1[i]
        t2, v2 = series2[j]
        if t1 == t2:
            res.append([t1, v1 + v2])
            i += 1
            j += 1
        elif t1 < t2:
            res.append([t1, v1])
            i += 1
        else:
            res.append([t2, v2])
            j += 1
    while i < m:
        res.append(series1[i])
        i += 1
    while j < n:
        res.append(series2[j])
        j += 1
    return res