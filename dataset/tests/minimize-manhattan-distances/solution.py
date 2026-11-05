class Solution:
    def minimumDistance(self, points: list[list[int]]) -> int:
        u = [x + y for x, y in points]
        v = [x - y for x, y in points]

        candidates = set()
        candidates.add(min(range(len(u)), key=lambda i: u[i]))
        candidates.add(max(range(len(u)), key=lambda i: u[i]))
        candidates.add(min(range(len(v)), key=lambda i: v[i]))
        candidates.add(max(range(len(v)), key=lambda i: v[i]))

        def max_dist_without(rem_idx):
            max_u, min_u = -float('inf'), float('inf')
            max_v, min_v = -float('inf'), float('inf')
            for i in range(len(points)):
                if i == rem_idx:
                    continue
                if u[i] > max_u: max_u = u[i]
                if u[i] < min_u: min_u = u[i]
                if v[i] > max_v: max_v = v[i]
                if v[i] < min_v: min_v = v[i]
            return max(max_u - min_u, max_v - min_v)

        return min(max_dist_without(cand) for cand in candidates)
