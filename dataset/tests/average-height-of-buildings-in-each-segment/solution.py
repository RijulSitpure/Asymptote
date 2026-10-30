from collections import defaultdict

class Solution:
    def averageHeightOfBuildings(self, buildings: list[list[int]]) -> list[list[int]]:
        events = defaultdict(lambda: [0, 0])
        for s, e, h in buildings:
            events[s][0] += h
            events[s][1] += 1
            events[e][0] -= h
            events[e][1] -= 1
            
        pts = sorted(events.keys())
        res = []
        curr_h = 0
        curr_cnt = 0
        prev_pos = None
        
        for p in pts:
            if prev_pos is not None and curr_cnt > 0:
                avg = curr_h // curr_cnt
                if res and res[-1][1] == prev_pos and res[-1][2] == avg:
                    res[-1][1] = p
                else:
                    res.append([prev_pos, p, avg])
            curr_h += events[p][0]
            curr_cnt += events[p][1]
            prev_pos = p
            
        return res
