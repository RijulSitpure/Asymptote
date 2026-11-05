class Solution:
    def simulationResult(self, windows: list[int], queries: list[int]) -> list[int]:
        seen = set()
        res = []
        for q in reversed(queries):
            if q not in seen:
                seen.add(q)
                res.append(q)
        for w in windows:
            if w not in seen:
                seen.add(w)
                res.append(w)
        return res
