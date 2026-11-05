def minOperationsI(nums: list[int], k: int) -> int:
    n = len(nums)
    if k < 2:
        return 0
    cost_even = [0] * k
    cost_odd = [0] * k
    for i, x in enumerate(nums):
        rem = x % k
        for r in range(k):
            c = min((rem - r) % k, (r - rem) % k)
            if i % 2 == 0:
                cost_even[r] += c
            else:
                cost_odd[r] += c
    ans = float('inf')
    for x in range(k):
        for y in range(k):
            if x != y:
                ans = min(ans, cost_even[x] + cost_odd[y])
    return ans