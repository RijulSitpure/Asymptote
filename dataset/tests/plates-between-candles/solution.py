class Solution:
    def platesBetweenCandles(self, s: str, queries: list[list[int]]) -> list[int]:
        n = len(s)
        plates_pref = [0] * (n + 1)
        for i, ch in enumerate(s):
            plates_pref[i + 1] = plates_pref[i] + (1 if ch == '*' else 0)

        left_candle = [-1] * n
        last = -1
        for i in range(n):
            if s[i] == '|':
                last = i
            left_candle[i] = last

        right_candle = [-1] * n
        last = -1
        for i in range(n - 1, -1, -1):
            if s[i] == '|':
                last = i
            right_candle[i] = last

        res = []
        for l, r in queries:
            c1 = right_candle[l]
            c2 = left_candle[r]
            if c1 != -1 and c2 != -1 and c1 < c2:
                res.append(plates_pref[c2 + 1] - plates_pref[c1])
            else:
                res.append(0)
        return res
