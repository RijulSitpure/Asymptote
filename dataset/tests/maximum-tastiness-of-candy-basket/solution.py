class Solution:
    def maximumTastiness(self, price: list[int], k: int) -> int:
        price.sort()
        lo = 0
        hi = price[-1] - price[0]
        while lo < hi:
            mid = (lo + hi + 1) // 2
            cnt = 1
            last = price[0]
            for p in price[1:]:
                if p >= last + mid:
                    cnt += 1
                    last = p
            if cnt >= k:
                lo = mid
            else:
                hi = mid - 1
        return lo
