from bisect import bisect_right

def kthSmallestEven(nums: list[int], queries: list[list[int]]) -> list[int]:
    n = len(nums)
    pref_evens = [0] * (n + 1)
    for i in range(n):
        pref_evens[i + 1] = pref_evens[i] + (1 if nums[i] % 2 == 0 else 0)
    ans = []
    for l, r, k in queries:
        low = 2
        high = 2 * (k + n)
        res = -1
        while low <= high:
            mid = (low + high) // 2
            if mid % 2 != 0:
                mid -= 1
            pos = min(r, bisect_right(nums, mid) - 1)
            removed = (pref_evens[pos + 1] - pref_evens[l]) if pos >= l else 0
            remaining = (mid // 2) - removed
            if remaining >= k:
                res = mid
                high = mid - 2
            else:
                low = mid + 2
        ans.append(res)
    return ans