def minimumFinishTimeWithCooldown(tasks: list[int], workers: int, cooldown: int) -> int:
    low = max(tasks)
    high = sum(tasks) + len(tasks) * cooldown
    
    def canFinish(limit: int) -> bool:
        used = 1
        cur = 0
        is_first = True
        for t in tasks:
            cost = t if is_first else t + cooldown
            if cur + cost > limit:
                used += 1
                cur = t
                is_first = False
                if used > workers or cur > limit:
                    return False
            else:
                cur += cost
                is_first = False
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