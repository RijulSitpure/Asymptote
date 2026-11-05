class Solution:
    def minConnectedGroups(self, intervals: list[list[int]], k: int) -> int:
        from bisect import bisect_right
        
        # 1. Merge overlapping intervals
        intervals.sort(key=lambda x: x[0])
        merged = []
        for iv in intervals:
            if not merged or merged[-1][1] < iv[0]:
                merged.append(iv)
            else:
                merged[-1][1] = max(merged[-1][1], iv[1])
                
        m = len(merged)
        if m <= 1:
            return m
            
        starts = [iv[0] for iv in merged]
        max_reduced = 0
        
        # 2. For each merged interval, inserting interval of length k starting at merged[i][1]
        for i in range(m):
            reach = merged[i][1] + k
            j = bisect_right(starts, reach) - 1
            if j > i:
                max_reduced = max(max_reduced, j - i)
                
        return m - max_reduced
