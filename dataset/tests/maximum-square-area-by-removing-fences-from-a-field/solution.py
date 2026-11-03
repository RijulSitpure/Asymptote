class Solution:
    def maximizeSquareArea(self, m: int, n: int, hFences: list[int], vFences: list[int]) -> int:
        MOD = 1_000_000_007
        h = sorted(hFences + [1, m])
        v = sorted(vFences + [1, n])
        h_gaps = set()
        for i in range(len(h)):
            for j in range(i + 1, len(h)):
                h_gaps.add(h[j] - h[i])
        max_side = -1
        for i in range(len(v)):
            for j in range(i + 1, len(v)):
                gap = v[j] - v[i]
                if gap in h_gaps:
                    max_side = max(max_side, gap)
        if max_side == -1:
            return -1
        return (max_side * max_side) % MOD
