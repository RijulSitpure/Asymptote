def maxSubarraySum(nums: list[int], m: int, k: int) -> int:
    n = len(nums)
    if m > n:
        return 0
    best = float('-inf')
    for i in range(n - m + 1):
        inside = sorted(nums[i:i + m])
        outside = sorted(nums[:i] + nums[i + m:], reverse=True)
        cur_sum = sum(inside)
        swaps = min(k, len(inside), len(outside))
        for s in range(swaps):
            if outside[s] > inside[s]:
                cur_sum += outside[s] - inside[s]
            else:
                break
        best = max(best, cur_sum)
    return best
