def minMovesToBalanceCircularArray(nums: list[int]) -> int:
    n = len(nums)
    total = sum(nums)
    if total % n != 0:
        return -1
    target = total // n
    # Cumulative flow across circular boundary
    flow = [0] * n
    cur = 0
    for i in range(n):
        cur += nums[i] - target
        flow[i] = cur
    flow.sort()
    median = flow[n // 2]
    return sum(abs(f - median) for f in flow)