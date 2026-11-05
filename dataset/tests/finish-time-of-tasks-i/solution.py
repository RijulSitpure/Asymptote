def minimumFinishTime(tasks: list[int], workers: int) -> int:
    low = max(tasks)
    high = sum(tasks)
    
    def canFinish(limit: int) -> bool:
        used = 1
        cur = 0
        for t in tasks:
            if cur + t > limit:
                used += 1
                cur = t
                if used > workers:
                    return False
            else:
                cur += t
        return True

    ans = high
    while low <= high:
        mid = (low + high) // 2
        if canFinish(mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans