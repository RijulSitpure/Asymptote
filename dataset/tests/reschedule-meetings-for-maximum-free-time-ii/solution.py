class Solution:
    def maxFreeTime(self, eventTime: int, startTime: list[int], endTime: list[int]) -> int:
        n = len(startTime)
        gaps = [startTime[0]]
        for i in range(1, n):
            gaps.append(startTime[i] - endTime[i - 1])
        gaps.append(eventTime - endTime[n - 1])
        
        m = len(gaps)
        pref = [0] * m
        suff = [0] * m
        pref[0] = gaps[0]
        for i in range(1, m):
            pref[i] = max(pref[i - 1], gaps[i])
        suff[-1] = gaps[-1]
        for i in range(m - 2, -1, -1):
            suff[i] = max(suff[i + 1], gaps[i])
            
        ans = max(gaps)
        for i in range(n):
            dur = endTime[i] - startTime[i]
            ans = max(ans, gaps[i] + gaps[i + 1])
            outside = 0
            if i > 0:
                outside = max(outside, pref[i - 1])
            if i + 2 < m:
                outside = max(outside, suff[i + 2])
            if outside >= dur:
                ans = max(ans, gaps[i] + gaps[i + 1] + dur)
        return ans
