def minOperationsII(nums: list[int], k: int) -> int:
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
    even_sorted = sorted(range(k), key=lambda r: cost_even[r])[:2]
    odd_sorted = sorted(range(k), key=lambda r: cost_odd[r])[:2]
    ans = float('inf')
    for x in even_sorted:
        for y in odd_sorted:
            if x != y:
                ans = min(ans, cost_even[x] + cost_odd[y])
    return ans