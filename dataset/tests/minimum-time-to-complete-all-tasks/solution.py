class Solution:
    def findMinimumTime(self, tasks: list[list[int]]) -> int:
        tasks.sort(key=lambda t: t[1])
        used = [False] * 2001
        for start, end, duration in tasks:
            already = sum(used[t] for t in range(start, end + 1))
            needed = duration - already
            t = end
            while needed > 0:
                if not used[t]:
                    used[t] = True
                    needed -= 1
                t -= 1
        return sum(used)
