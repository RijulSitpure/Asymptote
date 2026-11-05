def maxDeviceRatings(ratings: list[int]) -> int:
    inc = 0
    exc = 0
    for r in ratings:
        new_inc = exc + max(0, r)
        new_exc = max(inc, exc)
        inc, exc = new_inc, new_exc
    return max(inc, exc)