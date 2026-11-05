def countKthRoots(l: int, r: int, k: int) -> int:
    if k == 1:
        return r - l + 1
        
    def max_base(limit: int) -> int:
        if limit < 0:
            return -1
        low = 0
        high = int(limit ** (1.0 / k)) + 2
        best = 0
        while low <= high:
            mid = (low + high) // 2
            if mid ** k <= limit:
                best = mid
                low = mid + 1
            else:
                high = mid - 1
        return best

    upper = max_base(r)
    lower = max_base(l - 1)
    return max(0, upper - lower)