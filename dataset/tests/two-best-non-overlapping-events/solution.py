import bisect

class Solution:
    def maxTwoEvents(self, events: list[list[int]]) -> int:
        events.sort(key=lambda x: x[0])
        n = len(events)
        suffix_max = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix_max[i] = max(suffix_max[i + 1], events[i][2])

        starts = [e[0] for e in events]
        ans = 0

        for s, e, val in events:
            idx = bisect.bisect_right(starts, e)
            ans = max(ans, val + suffix_max[idx])

        return ans
