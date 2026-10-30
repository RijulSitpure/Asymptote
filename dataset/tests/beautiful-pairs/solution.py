class Solution:
    def beautifulPair(self, nums1: list[int], nums2: list[int]) -> list[int]:
        from collections import defaultdict
        pl = defaultdict(list)
        for i, (x, y) in enumerate(zip(nums1, nums2)):
            pl[(x, y)].append(i)
        for (x, y), indices in pl.items():
            if len(indices) > 1:
                return [indices[0], indices[1]]
        points = sorted((x, y, i) for i, (x, y) in enumerate(zip(nums1, nums2)))
        def dist(p1, p2):
            return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])
        def dfs(l, r):
            if l >= r:
                return float('inf'), -1, -1
            mid = (l + r) // 2
            mid_x = points[mid][0]
            d1, i1, j1 = dfs(l, mid)
            d2, i2, j2 = dfs(mid + 1, r)
            if d1 < d2 or (d1 == d2 and (i1, j1) < (i2, j2)):
                best_d, best_i, best_j = d1, i1, j1
            else:
                best_d, best_i, best_j = d2, i2, j2
            strip = [points[i] for i in range(l, r + 1) if abs(points[i][0] - mid_x) <= best_d]
            strip.sort(key=lambda p: p[1])
            m = len(strip)
            for i in range(m):
                for j in range(i + 1, m):
                    if strip[j][1] - strip[i][1] > best_d:
                        break
                    d = dist(strip[i], strip[j])
                    pi, pj = sorted([strip[i][2], strip[j][2]])
                    if d < best_d or (d == best_d and (pi, pj) < (best_i, best_j)):
                        best_d, best_i, best_j = d, pi, pj
            return best_d, best_i, best_j
        _, pi, pj = dfs(0, len(points) - 1)
        return [pi, pj]
