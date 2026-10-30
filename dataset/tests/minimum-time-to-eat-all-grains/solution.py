class Solution:
    def minimumTime(self, hens: list[int], grains: list[int]) -> int:
        hens.sort()
        grains.sort()
        def check(t):
            g_idx = 0
            m = len(grains)
            for h in hens:
                if g_idx == m:
                    break
                if grains[g_idx] < h:
                    d = h - grains[g_idx]
                    if d > t:
                        return False
                    max_right = max(h + (t - 2 * d), h + (t - d) // 2)
                else:
                    max_right = h + t
                while g_idx < m and grains[g_idx] <= max_right:
                    g_idx += 1
            return g_idx == m
        low = 0
        high = 2 * (max(hens[-1], grains[-1]) - min(hens[0], grains[0]))
        while low < high:
            mid = (low + high) // 2
            if check(mid):
                high = mid
            else:
                low = mid + 1
        return low
