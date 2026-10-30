import bisect

class Solution:
    def maximumBeauty(self, items: list[list[int]], queries: list[int]) -> list[int]:
        items.sort(key=lambda x: x[0])
        prices = [item[0] for item in items]
        max_beauty = []
        cur_max = 0
        for item in items:
            cur_max = max(cur_max, item[1])
            max_beauty.append(cur_max)

        res = []
        for q in queries:
            idx = bisect.bisect_right(prices, q) - 1
            res.append(max_beauty[idx] if idx >= 0 else 0)
        return res
