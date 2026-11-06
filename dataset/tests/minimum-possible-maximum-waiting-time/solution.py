def minMaxWaitingTime(times: list[int], m: int) -> int:
    low = max(times)
    high = sum(times)
    
    def canDistribute(limit: int) -> bool:
        used = 1
        cur = 0
        for t in times:
            if cur + t > limit:
                used += 1
                cur = t
                if used > m:
                    return False
            else:
                cur += t
        return True

    ans = high
    while low <= high:
        mid = (low + high) // 2
        if canDistribute(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans