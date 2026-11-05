class Solution:
    def maxArea(self, height: int, positions: list[int], directions: str) -> int:
        from collections import defaultdict
        area = sum(positions)
        ans = area
        diff = 0
        
        events = defaultdict(list)
        dirs = list(directions)
        
        for i, (p, d) in enumerate(zip(positions, dirs)):
            if d == 'U':
                events[height - p].append(i)
                events[height - p + height].append(i)
                diff += 1
            else:
                events[p].append(i)
                events[p + height].append(i)
                diff -= 1
                
        sorted_times = sorted(events.keys())
        prev_time = 0
        for t in sorted_times:
            area += (t - prev_time) * diff
            ans = max(ans, area)
            prev_time = t
            for idx in events[t]:
                if dirs[idx] == 'U':
                    dirs[idx] = 'D'
                    diff -= 2
                else:
                    dirs[idx] = 'U'
                    diff += 2
        return ans
