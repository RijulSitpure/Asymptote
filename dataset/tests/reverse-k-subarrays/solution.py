def reverseKSubarrays(nums: list[int], k: int) -> list[int]:
    res = list(nums)
    n = len(res)
    for start in range(0, n, k):
        l = start
        r = min(start + k - 1, n - 1)
        while l < r:
            res[l], res[r] = res[r], res[l]
            l += 1
            r -= 1
    return res