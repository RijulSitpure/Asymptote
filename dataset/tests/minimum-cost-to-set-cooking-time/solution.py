class Solution:
    def minCostSetTime(self, startAt: int, moveCost: int, pushCost: int, targetSeconds: int) -> int:
        candidates = []
        m1 = targetSeconds // 60
        s1 = targetSeconds % 60
        if m1 <= 99:
            candidates.append(f"{m1:02d}{s1:02d}".lstrip('0'))
        if m1 > 0:
            m2 = m1 - 1
            s2 = s1 + 60
            if s2 <= 99:
                candidates.append(f"{m2:02d}{s2:02d}".lstrip('0'))
        
        def calc_cost(s):
            cost = 0
            curr = str(startAt)
            for ch in s:
                if ch != curr:
                    cost += moveCost
                    curr = ch
                cost += pushCost
            return cost
            
        return min(calc_cost(c) for c in candidates)
