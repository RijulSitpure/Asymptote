import bisect

class Solution:
    def maxCount(self, banned: list[int], n: int, maxSum: int) -> int:
        banned = sorted(list(set(x for x in banned if x <= n)))
        pref = [0] * (len(banned) + 1)
        for i in range(len(banned)):
            pref[i + 1] = pref[i] + banned[i]
            
        def check(M: int) -> bool:
            idx = bisect.bisect_right(banned, M)
            sum_total = M * (M + 1) // 2 - pref[idx]
            return sum_total <= maxSum

        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if check(mid):
                lo = mid
            else:
                hi = mid - 1
        idx = bisect.bisect_right(banned, lo)
        return lo - idx
