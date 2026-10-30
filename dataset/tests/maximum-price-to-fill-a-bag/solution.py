class Solution:
    def maxPrice(self, items: list[list[int]], capacity: int) -> float:
        if sum(w for p, w in items) < capacity:
            return -1.0
        items.sort(key=lambda x: x[0] / x[1], reverse=True)
        ans = 0.0
        rem = capacity
        for p, w in items:
            if rem <= w:
                ans += (p / w) * rem
                return ans
            else:
                ans += p
                rem -= w
        return ans
