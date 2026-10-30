class Solution:
    def substringXorQueries(self, s: str, queries: list[list[int]]) -> list[list[int]]:
        seen = {}
        n = len(s)
        for length in range(1, 31):
            for i in range(n - length + 1):
                val = int(s[i:i + length], 2)
                if val not in seen:
                    seen[val] = [i, i + length - 1]
        res = []
        for first, second in queries:
            target = first ^ second
            res.append(seen.get(target, [-1, -1]))
        return res
