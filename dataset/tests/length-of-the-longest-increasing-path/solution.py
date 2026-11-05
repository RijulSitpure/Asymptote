class Solution:
    def maxPathLength(self, coordinates: list[list[int]], k: int) -> int:
        from bisect import bisect_left
        
        kx, ky = coordinates[k]
        
        # Partition into points strictly smaller (both x and y) and strictly larger
        left_pts = [p for p in coordinates if p[0] < kx and p[1] < ky]
        right_pts = [p for p in coordinates if p[0] > kx and p[1] > ky]
        
        def lis_2d(pts):
            if not pts:
                return 0
            # Sort by x ascending, and by y descending to avoid same-x sharing
            pts.sort(key=lambda p: (p[0], -p[1]))
            tails = []
            for _, y in pts:
                idx = bisect_left(tails, y)
                if idx == len(tails):
                    tails.append(y)
                else:
                    tails[idx] = y
            return len(tails)
            
        return lis_2d(left_pts) + 1 + lis_2d(right_pts)
