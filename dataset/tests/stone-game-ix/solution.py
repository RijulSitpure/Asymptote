from collections import Counter

class Solution:
    def stoneGameIX(self, stones: list[int]) -> bool:
        cnt = Counter(x % 3 for x in stones)
        c0, c1, c2 = cnt[0], cnt[1], cnt[2]
        if c0 % 2 == 0:
            return c1 >= 1 and c2 >= 1
        else:
            return abs(c1 - c2) > 2
