class Solution:
    def minimumString(self, a: str, b: str, c: str) -> str:
        def merge(s1: str, s2: str) -> str:
            if s2 in s1:
                return s1
            max_overlap = min(len(s1), len(s2))
            for i in range(max_overlap, 0, -1):
                if s1.endswith(s2[:i]):
                    return s1 + s2[i:]
            return s1 + s2

        candidates = [
            merge(merge(a, b), c),
            merge(merge(a, c), b),
            merge(merge(b, a), c),
            merge(merge(b, c), a),
            merge(merge(c, a), b),
            merge(merge(c, b), a)
        ]
        best = candidates[0]
        for cand in candidates[1:]:
            if len(cand) < len(best) or (len(cand) == len(best) and cand < best):
                best = cand
        return best